const express = require("express");
const probController = require("./../controllers/probController");
const protectAdminRoutes = require("./../utils/protectAdminRoutes");

const router = express.Router();

router
  .route("/")
  .get(probController.retrieve)
  .post(protectAdminRoutes.protect, probController.add)
  .patch(protectAdminRoutes.protect, probController.update)
  .delete(protectAdminRoutes.protect, probController.delete);

module.exports = router;
