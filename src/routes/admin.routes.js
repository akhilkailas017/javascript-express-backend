const express = require("express");
const {
  loginAdmin,
  adminRefreshToken,
} = require("../controllers/auth.controller");
const { getAllUsers } = require("../controllers/user.controller");
const adminAuthMiddleware = require("../middleware/adminAuth.middleware");
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/refresh-token", adminRefreshToken);
router.get("/users", adminAuthMiddleware, getAllUsers);

module.exports = router;
