const mongoose = require("mongoose");
const schedule = require("node-schedule");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const contestSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Contest title is required"],
      unique: [true, "This title has already been used"],
    },
    description: String,
    winners: [String],
    status: {
      type: String,
      enum: {
        values: ["UPCOMING", "ONGOING", "OVER"],
        message:
          "{VALUE} is not supported as contest status, try among UPCOMING, ONGOING, OVER",
      },
      required: [true, "Contest status is required"],
    },
    startTime: {
      type: Date,
      required: [true, "Start Time is required"],
    },
    endTime: {
      type: Date,
      required: [true, "End Time is required"],
    },
    problems: {
      type: [String],
      required: [true, "Problem IDs are required"],
    },
    contestants: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
    joined: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Contest = mongoose.model("Contest", contestSchema);

contestSchema.virtual("registered").get(function () {
  return this.contestants.length;
});

contestSchema.virtual("attended").get(function () {
  return this.joined.length;
});

contestSchema.pre("updateOne", async function (next) {
  const data = this.getUpdate();
  const doc = await Contest.findOne({ _id: data.contestId });
  if (doc === null)
    return next(new AppError("No Contests found with that Id", 422));
  if (doc.status === "OVER") {
    return next(
      new AppError(
        "This contest is already over. Cannot update contest times. Try creating a new contest!",
        400
      )
    );
  }
  if (new Date(data.data.startTime) < new Date(Date.now()))
    return next(new AppError("Contest startTime should be in the future", 400));
  if (data.data.startTime < data.data.endTime) next();
  else
    return next(
      new AppError("Contest start time cannot be earlier than end time", 400)
    );
});

contestSchema.pre("save", function (next) {
  if (this.data.startTime < Date.now())
    return next(new AppError("Contest startTime should be in the future", 400));
  if (this.data.startTime < this.data.endTime) next();
  else
    return next(
      new AppError("Contest start time cannot be earlier than end time", 400)
    );
});

contestSchema.post("save", function (error, doc, next) {
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
    next(
      new AppError(
        "This contest already exists in database! Try changing the name of the contest."
      )
    );
  } else {
    next(error);
  }
});

Contest.watch().on(
  "change",
  catchAsync(async (data) => {
    const contest = await Contest.findOne({ _id: data.documentKey._id });
    if (contest?.startTime > Date.now()) {
      schedule.scheduleJob(contest.startTime, async function () {
        contest.status = "ONGOING";
        await contest.save();
      });
    }
    if (contest?.endTime > Date.now()) {
      schedule.scheduleJob(contest.endTime, async function () {
        contest.status = "OVER";
        await contest.save();
      });
    }
  })
);

module.exports = Contest;
