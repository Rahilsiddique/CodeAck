const express = require("express");
const contestController = require("./../controllers/contestController");
const protectAdminRoutes = require("./../utils/protectAdminRoutes");
const router = express.Router();

router.get("/upcoming", contestController.upcoming);
router.post("/register", contestController.register);

router
  .route("/")
  .get(contestController.retrieve)
  .post(protectAdminRoutes.protect, contestController.createContest)
  .patch(protectAdminRoutes.protect, contestController.updateContestDetails)
  .delete(protectAdminRoutes.protect, contestController.cancelContest);

module.exports = router;
