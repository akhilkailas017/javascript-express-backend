const userService = require("../services/user.service");

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers(req.query);
    return res.status(200).json({ data: users });
  } catch (err) {
    return res.status(err.status || 500).json({
      error: err.message || "Failed to fetch users",
    });
  }
}

module.exports = {
  getAllUsers,
};
