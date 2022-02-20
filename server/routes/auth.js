const express = require("express");

const AuthController = require("../controllers/auth");
const { checkAuth } = require("../middlewares/auth");

const router = express.Router();

router
  .get("/me", checkAuth, AuthController.me)
  .get("/login", AuthController.login)
  .get("/callback", AuthController.authCallback)
  .get("/refresh_token", AuthController.refreshToken);

module.exports = router;
