const express = require("express");
const probController = require("./../controllers/probController");

const router = express.Router();

router
  .route("/")
  .get(probController.retrieve)
  .post(probController.protect, probController.add)
  .patch(probController.protect, probController.update)
  .delete(probController.protect, probController.delete);

module.exports = router;
