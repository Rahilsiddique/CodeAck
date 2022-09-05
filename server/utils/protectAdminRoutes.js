const JWT = require("jsonwebtoken");
exports.protect = (req, res, next) => {
  if (req.cookies.jwt) {
    const auth = JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
    if (auth.userdata?.role === "admin") {
      return next();
    }
  }
  res.status(403).json({
    status: "fail",
    message: "Unauthorized",
  });
};
