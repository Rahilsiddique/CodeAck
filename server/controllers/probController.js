const Problem = require("./../models/probModel");
const catchAsync = require("../utils/catchAsync");
const JWT = require("jsonwebtoken");

exports.retrieve = catchAsync(async (req, res, next) => {
  const problems = await Problem.find();
  const results = await Problem.find().count();
  res.status(200).json({
    status: "success",
    results,
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
  await Problem.findOneAndUpdate({ title: req.body.title }, req.body);
  res.status(200).json({
    status: "success",
    message: "Problem updated successfully",
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  await Problem.deleteOne({ title: req.body.title });
  res.status(200).json({
    status: "success",
    message: "Problem deleted successfully",
  });
});
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
