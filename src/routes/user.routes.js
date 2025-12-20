const express = require("express");
const {
  registerUser,
  loginUser,
  userRefreshToken,
} = require("../controllers/auth.controller");
const { createItem } = require("../controllers/item.controller");
const userAuthMiddleware = require("../middleware/userAuth.middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", userRefreshToken);
router.post("/item", userAuthMiddleware, createItem);

module.exports = router;
