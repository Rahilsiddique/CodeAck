const { google } = require("googleapis");
const url = require("url");
const axios = require("axios");
const JWT = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const User = require("./../models/userModel");

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI
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

const getUserInfo = async (token) => {
  return await axios.get(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const login = async (req, res, next, tokens) => {
  const token = req.header?.jwt;
  if (token !== undefined) {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    return getUserInfo(decoded.access_token);
  } else {
    return getUserInfo(tokens.access_token);
  }
};
exports.login = login;
// const getUserInfo = catchAsync(async (tokens) => {
//   return await axios.get(
//     "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
//     {
//       headers: {
//         Authorization: `Bearer ${tokens.access_token}`,
//       },
//     }
//   );
// If access_token is invalid refresh the access_token
// const refresh = await axios.post(
//   "https://www.googleapis.com/oauth2/v4/token",
//   {
//     body: {
//       client_id: process.env.GOOGLE_CLIENT_IDD,
//       client_secret: process.env.GOOGLE_CLIENT_SECRET,
//       refresh_token: tokens.refresh_token,
//       grant_type: "refresh_token",
//     },
//   }
// );
// User.findOneAndUpdate(
//   { refresh_token: tokens.refresh_token },
//   { $set: { access_token: refresh.access_token } }
// );
// res.json({
//   status: "success",
//   message: "refresh_token refreshed for this user",
// });
// If access_token is valid return the data
// if (results.data !== undefined) return results;
// });

/**
 * Sign the user up if they are new
 */

exports.oauth2callback = catchAsync(async (req, res, next) => {
  // 1. Receive the callback from Google's OAuth 2.0 server. Handle the OAuth 2.0 server response
  let q = url.parse(req.url, true).query;

  // 2. Get access and refresh tokens (if access_type is offline)
  let { tokens } = await oauth2Client.getToken(q.code);
  console.log(tokens);
  oauth2Client.setCredentials(tokens);
  const results = await login(req, res, next, tokens);
  const userinfo = results.data;

  // 3. If user doesn't already exist create the user in the database
  const users = {
    userId: userinfo.id,
    name: userinfo.name,
    email: userinfo.email,
    profilePicture: userinfo.picture,
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    exp: new Date(tokens.expiry_date).getTime(),
  };
  // User Signup
  if (!(await User.findOne({ email: users.email }))) {
    const user = await User.create(users);
    console.log(user);
  } else {
    // User Login
    await User.findOneAndUpdate(
      { email: userinfo.email },
      { access_token: users.access_token, refresh_token: users.refresh_token }
    );
  }

  // 4. Create a JWT token
  const token = JWT.sign(
    {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      userdata: userinfo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  // 5. Create a JWT_COOKIE using tokens and user_info
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  res.json({
    status: "success",
    message: "User signed in Successfully",
  });
});

exports.redirectToAuthUrl = (req, res, next) => {
  res.redirect(authorizationUrl);
};
