const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");

async function createUser(name, email, age, password) {
  if (!name || !email || !age || !password) {
    throw new Error("All fields are required: name, email, age, password");
  }
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({
    name,
    email,
    age,
    password: hashedPassword,
  });
  return user;
}

module.exports = {
  createUser,
};
