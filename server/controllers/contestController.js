const catchAsync = require("../utils/catchAsync");
const Contest = require("./../models/contestModel");
const JWT = require("jsonwebtoken");

exports.upcoming = catchAsync(async (req, res, next) => {
  const upcomingContests = await Contest.find({ status: "UPCOMING" });
  const results = await Contest.find({ status: "UPCOMING" }).count();
  res.status(200).json({
    status: "success",
    results,
    upcomingContests,
  });
});

exports.retrieve = catchAsync(async (req, res, next) => {
  const contests = await Contest.find();
  const results = await Contest.find().count();
  res.status(200).json({
    status: "success",
    results,
    contests,
  });
});

exports.createContest = catchAsync(async (req, res, next) => {
  await Contest.create(req.body);
  res.status(200).json({
    status: "success",
    message: "Contest posted successfully",
  });
});

exports.updateContestDetails = catchAsync(async (req, res, next) => {
  await Contest.updateOne({ _id: req.body._id }, req.body);
  res.status(200).json({
    status: "success",
    message: "Contest details updated successfully",
  });
});

exports.cancelContest = catchAsync(async (req, res, next) => {
  await Contest.deleteOne({ _id: req.body._id });
  res.status(200).json({
    status: "success",
    message: "Contest cancelled successfully",
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const user = JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const contest = await Contest.findOneAndUpdate(
    { _id: req.body._id },
    { $addToSet: { participants: user.userdata.email } }
  );
  res.status(200).json({
    status: "success",
    registered: contest.registered,
    message: "User registered successfully",
  });
});
