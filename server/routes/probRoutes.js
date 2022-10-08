const express = require("express");
const probController = require("./../controllers/probController");
const authController = require("./../controllers/authController");
const protectAdminRoutes = require("./../utils/protectAdminRoutes");

const router = express.Router();

router
  .route("/")
  .get(authController.isLoggedIn, probController.getProblems)
  .post(protectAdminRoutes.protect, probController.add)
  .patch(protectAdminRoutes.protect, probController.update)
  .delete(protectAdminRoutes.protect, probController.delete);

module.exports = router;
