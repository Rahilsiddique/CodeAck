const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/auth", authController.signup);
router.get("/auth/google", authController.sendAuthUrl);
router.get("/oauth2callback", authController.oauth2callback);
router.get("/logout", authController.logout);
router.get(
  "/loggedIn",
  authController.isLoggedIn,
  authController.displayUserDetails
);
module.exports = router;
