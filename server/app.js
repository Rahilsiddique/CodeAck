const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const probRouter = require("./routes/probRoutes");
const contestRouter = require("./routes/contestRoutes");
<<<<<<< HEAD
const submissionsRouter = require("./routes/submissionRoutes");
=======
const submissionRouter = require("./routes/submissionRoutes");
>>>>>>> 27160f4e9e16d52a50274588d8f99b3f93d96764

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/users", userRouter);
app.use("/problems", probRouter);
app.use("/contests", contestRouter);
<<<<<<< HEAD
app.use("/submissions", submissionsRouter);
=======
app.use("/submissions", submissionRouter);
>>>>>>> 27160f4e9e16d52a50274588d8f99b3f93d96764

// Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
