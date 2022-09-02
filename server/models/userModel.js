const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userId: String,
  name: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  profilePicture: String,
  lastLoginAt: Date,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
