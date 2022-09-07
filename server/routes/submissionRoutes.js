const express = require("express");
const subController = require("./../controllers/subController");

const router = express.Router();

router.post("/", subController.newSubmission);
router.get("/", subController.previousSubmissions);

module.exports = router;
