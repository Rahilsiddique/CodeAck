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
  access_token: String,
  refresh_token: String,
  exp: Date,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
