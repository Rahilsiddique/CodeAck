const Problem = require("./../models/probModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError.js");

exports.getProblems = catchAsync(async (req, res, next) => {
  const docs = new ApiFeatures(Problem.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();
  const problems = await docs.query;
  res.status(200).json({
    status: "success",
    results: problems.length,
    problems,
  });
});

exports.add = catchAsync(async (req, res, next) => {
  const problem = req.body;
  await Problem.create(problem);
  res.status(200).json({
    status: "success",
    message: "Problem added successfully",
  });
});

exports.update = catchAsync(async (req, res, next) => {
  if (Object.keys(req.body.data).length === 0) {
    next(
      new AppError(
        "Empty update request! Use data field to enter updated information",
        422
      )
    );
  }
  const done = await Problem.findOneAndUpdate(
    { _id: req.body.problemId },
    req.body.data
  );
  if (!done) return next(new AppError("No Contests found with that Id", 422));
  res.status(200).json({
    status: "success",
    message: "Problem updated successfully",
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const done = await Problem.findOneAndDelete({ _id: req.body.problemId });
  if (!done) return next(new AppError("No Contests found with that Id", 422));
  res.status(200).json({
    status: "success",
    message: "Problem deleted successfully",
  });
});
