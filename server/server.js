const mongoose = require("mongoose");
const dotenv = require("dotenv");
const schedule = require("node-schedule");
const Contest = require("./models/contestModel");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.NODE_ENV === "development")
      console.log("DB connection successful!");
  });

//Listener for contest start
(async () => {
  const contests = await Contest.find();
  contests.forEach((contest) => {
    schedule.scheduleJob(contest.date, async function () {
      contest.status = "ONGOING";
      await contest.save();
    });
  });
})();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  if (process.env.NODE_ENV === "development")
    console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
