const mongoose = require("mongoose");

const probSchema = mongoose.Schema({
  difficulty: String,
  title: {
    type: String,
    required: [true, "Problem title is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Problem description is required"],
  },
  example: [
    {
      input: [String],
      output: [String],
    },
  ],
  testcases: [
    {
      input: [String],
      output: [String],
    },
  ],
  upvotes: Number,
  downvotes: Number,
  relatedTopics: [String],
  hint: [String],
  createdAt: Date,
});

probSchema.post("save", function (error, doc, next) {
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
    next(new Error("This problem already exists in database"));
  } else {
    next(error);
  }
});

const Problem = mongoose.model("Problems", probSchema);
module.exports = Problem;
