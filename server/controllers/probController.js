const Problem = require("./../models/probModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");
const AppError = require("../utils/appError");

exports.getProblems = catchAsync(async (req, res, next) => {
  const docs = new ApiFeatures(Problem.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();
  const problems = await docs.query;
  if (!problems) {
    return next(new AppError("Something went wrong. Please Try again!", 500));
  }
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
  await Problem.findOneAndUpdate({ title: req.body.problemId }, req.body);
  res.status(200).json({
    status: "success",
    message: "Problem updated successfully",
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  await Problem.deleteOne({ title: req.body.problemId });
  res.status(200).json({
    status: "success",
    message: "Problem deleted successfully",
  });
});
