const express = require("express");
const {
  registerUser,
  loginUser,
  userRefreshToken,
} = require("../controllers/auth.controller");
const { createItem, getItem } = require("../controllers/item.controller");
const userAuthMiddleware = require("../middleware/userAuth.middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", userRefreshToken);
router.post("/item", userAuthMiddleware, createItem);
router.get("/item", userAuthMiddleware, getItem);

module.exports = router;
