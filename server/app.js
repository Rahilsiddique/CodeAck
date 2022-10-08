const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const probRouter = require("./routes/probRoutes");
const contestRouter = require("./routes/contestRoutes");
const submissionsRouter = require("./routes/submissionRoutes");

const app = express();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/users", userRouter);
app.use("/problems", probRouter);
app.use("/contests", contestRouter);
app.use("/submissions", submissionsRouter);

// Error Handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
