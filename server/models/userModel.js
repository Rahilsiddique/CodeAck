const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const userSchema = mongoose.Schema({
  userId: String,
  role: String,
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  password: String,
  resetToken: String,
  profilePicture: String,
  createdAt: Date,
  lastLoginAt: Date,
});

userSchema.post("save", function (error, doc, next) {
  if (
    error.name === "ValidationError" &&
    process.env.NODE_ENV === "production"
  ) {
    error.isOperational = true;
  }
  if (
    error.name === "MongoServerError" &&
    error.code === 11000 &&
    process.env.NODE_ENV === "production"
  ) {
    next(new AppError("This user already exists. Please try logging in!", 400));
  } else {
    next(error);
  }
});
const User = mongoose.model("users", userSchema);
module.exports = User;
