const express = require("express");
const {
  loginAdmin,
  adminRefreshToken,
} = require("../controllers/auth.controller");
const { getAllUsers } = require("../controllers/user.controller");
const router = express.Router();

router.post("/login", loginAdmin);
router.post("/refresh-token", adminRefreshToken);
router.get("/users", getAllUsers);

module.exports = router;
