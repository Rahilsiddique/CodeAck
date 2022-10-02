const mongoose = require("mongoose");

const submissionsSchema = mongoose.Schema({
  userId: {
    type: String,
    required: [true, "User Id is required"],
  },
  date: Date,
  submissionData: {
    source_code: {
      type: String,
      required: [true, "Source code is required"],
    },
    language_id: {
      type: String,
      required: [true, "Language ID is required"],
    },
    std_in: String,
    expected_output: {
      type: String,
      required: [true, "Expected Output is required"],
    },
  },
  result: {
    stdout: String,
    time: String,
    memory: String,
    stderr: String,
    token: String,
    compile_output: String,
    message: String,
    status: {
      id: Number,
      description: String,
    },
  },
});
// Calculate query execution time
// submissionsSchema.pre("save", function (next) {
//   this.start = Date.now();
//   next();
// });
// submissionsSchema.post("save", function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds!`);
//   next();
// });
submissionsSchema.post("save", function (error, doc, next) {
  if (
    error.name === "ValidationError" &&
    process.env.NODE_ENV === "production"
  ) {
    error.isOperational = true;
  }
});

const Submission = mongoose.model("Submission", submissionsSchema);
module.exports = Submission;
