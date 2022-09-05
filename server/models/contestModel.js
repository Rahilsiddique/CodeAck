const mongoose = require("mongoose");

const contestSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Contest title is required"],
    unique: [true, "This title has already been used"],
  },
  description: {
    type: String,
  },
  winners: {
    type: [String],
  },
  status: {
    type: String,
    enum: {
      values: ["UPCOMING", "ONGOING", "COMPLETED"],
      message:
        "{VALUE} is not supported as contest status, try among UPCOMING, ONGOING, COMPLETED",
    },
    required: [true, "Contest status is required"],
  },
  date: {
    type: Date,
    required: [true, "Date is required"],
  },
  duration: {
    type: String,
    required: [true, "Duration is required"],
  },
  problems: {
    type: [String],
    required: [true, "Problem IDs are required"],
  },
  participants: [{ type: String, unique: true }],
  joined: [{ type: String, unique: true }],
});

contestSchema.virtual("registered").get(function () {
  return this.participants.length;
});

contestSchema.virtual("attended").get(function () {
  return this.joined.length;
});

contestSchema.post("save", function (error, doc, next) {
  if (
    error.name === "MongoServerError" &&
    error.code === 11000 &&
    process.env.NODE_ENV === "production"
  ) {
    next(new Error("This contest already exists in database"));
  } else {
    next(error);
  }
});

const Contest = mongoose.model("Contest", contestSchema);
module.exports = Contest;
