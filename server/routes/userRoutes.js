const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/auth/google", authController.redirectToAuthUrl);
router.get("/oauth2callback", authController.oauth2callback);
router.get(
  "/loggedIn",
  authController.isLoggedIn,
  authController.displayUserDetails
);
module.exports = router;
