const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const probRouter = require("./routes/probRoutes");
const contestRouter = require("./routes/contestRoutes");
const submissionsRouter = require("./routes/submissionRoutes");

const app = express();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.static("public/img"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "docs.html"));
});
app.use("/users", userRouter);
app.use("/problems", probRouter);
app.use("/contests", contestRouter);
app.use("/submissions", submissionsRouter);

// Error Handling Middleware
app.all("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(globalErrorHandler);

module.exports = app;
