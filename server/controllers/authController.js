const { google } = require("googleapis");
const url = require("url");
const axios = require("axios");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");
const AppError = require("../utils/appError");
const nodemailer = require("nodemailer");
const { randomUUID } = require("crypto");

// Method 1: Via Google OAuth 2.0
/**
 * To use OAuth2 authentication, we need access to CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
 * from the environment variables.
 */
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

// Access scopes.
const scopes = ["email", "profile"];

// Generate a url
const authorizationUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  /** Pass in the scopes array defined above.
   * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
  scope: scopes,
});

async function getUserInfo(token) {
  try {
    return (
      await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      )
    ).data;
  } catch (err) {
    throw err;
  }
}
exports.getUserInfo = getUserInfo;

exports.displayUserDetails = catchAsync(async (req, res, next) => {
  const decoded = JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
  res.status(200).json(decoded);
});

const createJWTToken = (data) => {
  let token = JWT.sign(
    {
      userdata: data,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
};

const setResponseCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // httpOnly: true
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
};

exports.oauth2callback = catchAsync(async (req, res, next) => {
  // 1. Receive the callback from Google's OAuth 2.0 server. Handle the OAuth 2.0 server response
  let q = url.parse(req.url, true).query;

  // 2. Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(q.code);
  oauth2Client.setCredentials(tokens);
  req.tokens = tokens;
  const results = await getUserInfo(req.tokens);
  const userinfo = results;
  if (userinfo.email === process.env.ADMIN_EMAIL) {
    userinfo.role = "admin";
  }

  // 3. If user doesn't already exist create the user in the database
  const users = {
    userId: userinfo.id,
    username: userinfo.name,
    email: userinfo.email,
    role: userinfo?.role,
    profilePicture: userinfo.picture,
    createdAt: new Date(Date.now()).getTime(),
  };
  let userid;
  // User Signup
  if (!(await User.findOne({ email: users.email }))) {
    userid = (await User.create(users))._id;
  } else {
    // User Login
    userid = (
      await User.findOneAndUpdate(
        { email: userinfo.email },
        {
          lastLoginAt: new Date(Date.now()).getTime(),
        }
      )
    )._id;
  }

  // 4. Create a JWT token
  const data = {
    _id: userid,
    email: userinfo.email,
    username: userinfo.given_name,
    profilePicture: userinfo.picture,
    role: userinfo?.role,
  };

  const token = createJWTToken(data);

  // 5. Create a JWT_COOKIE using tokens and user_info
  setResponseCookie(res, token);
  res.redirect(process.env.LOGIN_REDIRECT_URL);
});

exports.sendAuthUrl = (req, res, next) => {
  res.json({
    url: authorizationUrl,
  });
};

// Method 2: Via username/email and password
exports.signup = catchAsync(async (req, res, next) => {
  const userinfo = req.body;
  if (userinfo.password != userinfo.conpassword)
    return next(
      new AppError("Password and Confirm Password do not match", 400)
    );
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(userinfo.password, salt);
  const users = {
    username: userinfo.username,
    email: userinfo.email,
    password: hash,
    createdAt: new Date(Date.now()).getTime(),
  };
  const user = await User.create(users);
  const data = {
    _id: user._id,
    email: user.email,
    username: user.username,
    profilePicture: user?.profilePicture,
    role: user?.role,
  };
  const token = createJWTToken(data);
  setResponseCookie(res, token);
  res.redirect(process.env.LOGIN_REDIRECT_URL);
});

exports.login = catchAsync(async (req, res, next) => {
  const userinfo = req.body;
  const user = await User.findOne({ username: userinfo.username });
  if (user && (await bcrypt.compare(userinfo.password, user.password))) {
    await User.findOneAndUpdate(
      { username: user.username },
      {
        lastLoginAt: new Date(Date.now()).getTime(),
      }
    );
    const data = {
      _id: user._id,
      email: user.email,
      username: user.username,
      profilePicture: user?.profilePicture,
      role: user?.role,
    };
    const token = createJWTToken(data);
    setResponseCookie(res, token);
    res.redirect(process.env.LOGIN_REDIRECT_URL);
  } else {
    res.json({
      status: fail,
      message: "Invalid username/password",
    });
  }
});

exports.sendResetPasswordLink = catchAsync(async (req, res, next) => {
  const resetToken = randomUUID();
  const user = req.body;

  if (user && !(await User.findOne({ email: user.email })))
    return next(
      new AppError("Sorry that email address is not registered!", 404)
    );
  const date = new Date(Date.now());
  const resetTokenExpiry = Date.now() + 10 * 60 * 1000;
  await User.findOneAndUpdate(
    { email: user.email },
    { $set: { resetToken: resetToken } }
  );
  const resetLink =
    `${process.env.DOMAIN_NAME}users/auth/resetPassword/` +
    resetToken +
    `?exp=${resetTokenExpiry}`;
  // SEND EMAIL
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "codeack1@gmail.com",
      pass: "ufmxyscnzfhrkgxr",
    },
  });
  const emailContent = `<p>Dear User,</p><p>A password reset request was issued at ${date}, here is the link to reset your password for CodeAck which will be valid for 10 minutes</p><button style="padding: 10px; border: none; border-radius: 5px; background-color: #3b82f6; font-family: 'Trebuchet MS', sans-serif;"><a href=${resetLink} style="text-decoration: none; color: #fff; font-weight: bold;">Click here to reset your password</a></button>`;
  const options = {
    from: "codeack1@gmail.com",
    to: user.email,
    subject: "CodeAck Password reset link",
    html: emailContent,
  };
  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
    }
  });

  res.status(200).json({
    status: "success",
    message: "Password reset link successfully sent to your email",
  });
});

exports.validatePasswordReset = catchAsync(async (req, res, next) => {
  const token = req.params?.resetToken;
  if (!token)
    return res.status(403).json({
      status: "fail",
      message: "Unauthorized",
    });
  const exp = req.query.exp;
  if (exp > Date.now() && (await User.findOne({ resetToken: token }))) {
    res.redirect(`${process.env.DOMAIN_NAME}users/loggedIn`); // redirect to reset password form
  } else {
    res.json({
      status: "fail",
      message:
        "Invalid Password Reset link! The link has either expired or is invalid.",
    });
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const user = req.body;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(user.password, salt);
  await User.findOneAndUpdate(
    { email: user.email },
    { $set: { password: hash } }
  );
  res.json({
    status: "success",
    message: "Your password was reset successfully",
  });
});

exports.isLoggedIn = async (req, res, next) => {
  const cookie = req.cookies?.jwt;
  if (cookie === undefined) {
    res.status(401).json({ status: "fail", message: "Unauthenticated" });
  } else {
    await JWT.verify(req.cookies?.jwt, process.env.JWT_SECRET, (err) => {
      if (err) {
        next(
          new AppError("You are logged out. Please log in to continue", 400)
        );
      } else {
        next();
      }
    });
  }
};

exports.logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
