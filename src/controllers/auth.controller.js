const userService = require('../services/user.service');

async function registerUser(req, res) {
  try {
    const { name, email, age, password } = req.body;
    const user = await userService.createUser(name, email, age, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  registerUser,
};