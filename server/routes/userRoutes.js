const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);
router.post("/auth/resetPassword", authController.sendResetPasswordLink);
router.post(
  "/auth/changePassword/:resetToken",
  authController.validatePasswordReset,
  authController.resetPassword
);
router.get(
  "/auth/resetPassword/:resetToken",
  authController.validatePasswordReset
);
router.get("/auth/google", authController.sendAuthUrl);
router.get("/oauth2callback", authController.oauth2callback);
router.get("/logout", authController.logout);
router.get(
  "/loggedIn",
  authController.isLoggedIn,
  authController.displayUserDetails
);
module.exports = router;
