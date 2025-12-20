const userService = require("../services/user.service");

async function registerUser(req, res) {
  try {
    const { name, email, age, password } = req.body;
    if (!name || !email || !age || !password) {
      return res
        .status(400)
        .json({ error: "All fields are required: name, email, age, password" });
    }
    const user = await userService.createUser(name, email, age, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const result = await userService.loginUser(email, password);
    if (result.error) {
      return res.status(400).json({ error: result.error });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function userRefreshToken(req, res) {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Refresh token is required" });
  }
  try {
    const newTokens = await userService.userRefreshToken(token);
    res.status(200).json(newTokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
  loginUser,
  userRefreshToken,
};
