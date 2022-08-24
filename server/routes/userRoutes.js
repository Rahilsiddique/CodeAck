const express = require("express");
const JWT = require("jsonwebtoken");
const axios = require("axios");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/auth/google", authController.redirectToAuthUrl);
router.get("/oauth2callback", authController.oauth2callback);
router.get("/login", async (req, res, next) => {
  const token = req.headers?.jwt;
  console.log(token);
  let data = {};
  if (token !== undefined) {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    data = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: `Bearer ${decoded.access_token}`,
        },
      }
    );
  }
  res.json({
    data,
  });
});

module.exports = router;
