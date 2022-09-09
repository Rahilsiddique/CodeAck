const catchAsync = require("../utils/catchAsync");
const Contest = require("./../models/contestModel");
const JWT = require("jsonwebtoken");
const AppError = require("../utils/appError");
const ApiFeatures = require("../utils/apiFeatures");

exports.upcoming = catchAsync(async (req, res, next) => {
  const upcomingContests = await Contest.find({ status: "UPCOMING" });
  const results = await Contest.find({ status: "UPCOMING" }).count();
  res.status(200).json({
    status: "success",
    results,
    upcomingContests,
  });
});

exports.getContestDetails = catchAsync(async (req, res, next) => {
  const results = new ApiFeatures(
    Contest.find().populate("contestants").populate("joined"),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const contests = await results.query;
  res.status(200).json({
    status: "success",
    results: contests.length,
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
  await Contest.updateOne({ _id: req.body.contestId }, req.body);
  res.status(200).json({
    status: "success",
    message: "Contest details updated successfully",
  });
});

exports.cancelContest = catchAsync(async (req, res, next) => {
  await Contest.deleteOne({ _id: req.body.contestId });
  res.status(200).json({
    status: "success",
    message: "Contest cancelled successfully",
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const user = JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const contest = await Contest.findOneAndUpdate(
    { _id: req.body.contestId },
    { $addToSet: { contestants: user.userdata._id } }
  );
  res.status(200).json({
    status: "success",
    registered: contest.registered,
    message: "User registered successfully",
  });
});

exports.isRegistered = catchAsync(async (req, res, next) => {
  const user = JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const contest = await Contest.findOne({ _id: req.body.contestId });
  if (contest === null)
    return next(
      new AppError("Invalid Contest ID. Cannot find that contest.", 400)
    );
  if (contest.startTime > Date.now())
    return next(new AppError("The contest hasn't started yet", 403));
  if (contest.contestants.includes(user.userdata._id)) next();
  else {
    return next(
      new AppError(
        "You have not registered for the contest yet. Please register first to join",
        403
      )
    );
  }
});

exports.join = catchAsync(async (req, res, next) => {
  const user = JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
  const contest = await Contest.findOneAndUpdate(
    { _id: req.body.contestId },
    { $addToSet: { joined: user.userdata._id } }
  );
  res.status(200).json({
    status: "success",
    attended: contest.attended,
    message: "You have joined the contest",
  });
});
