const axios = require("axios");
const JWT = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const Submission = require("./../models/subModel");
const AppError = require("./../utils/appError");

exports.previousSubmissions = catchAsync(async (req, res, next) => {
  let user;
  await JWT.verify(req.cookies.jwt, process.env.JWT_SECRET, (err, User) => {
    if (err)
      return next(
        new AppError(
          "User is unauthenticated. Please log in and try again",
          401
        )
      );
    else user = User;
  });
  const prevSubmissions = await Submission.find({
    userId: user.userdata.userId,
  });
  const count = await Submission.find({
    userId: user.userdata.userId,
  }).countDocuments();
  res.status(200).json({
    status: "success",
    results: count,
    prevSubmissions,
  });
});

function wait(waitTime) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, waitTime);
  });
}

exports.newSubmission = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.headers);
  // const user = await JWT.verify(req.cookies.jwt, process.env.JWT_SECRET);
  // console.log(user);
  let token;
  try {
    token = await axios.post(`${process.env.JUDGE0_BASE_URL}submissions/`, {
      source_code: req.body.source_code,
      language_id: req.body.language_id,
      stdin: req.body.std_in,
      expected_output: req.body.expected_output,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "production")
      return next(new AppError("Something went wrong. Please try again", 500));
    else return next(err);
  }
  let result;
  while (
    result?.data?.status?.description === undefined ||
    result?.data?.status.description === "In Queue" ||
    result?.data?.status.description === "Processing"
  ) {
    await wait(100);
    result = await axios.get(
      `${process.env.JUDGE0_BASE_URL}submissions/${token.data.token}?base64_encoded=true`
    );
  }

  // this query takes min: 16ms and max 72ms
  const submission = {
    userId: user.userdata.userId,
    date: Date.now(),
    submissionData: req.body,
    result: result.data,
  };
  await Submission.create(submission);

  res.status(200).json({
    status: "success",
    token: token.data.token,
    result: result.data,
  });
});
