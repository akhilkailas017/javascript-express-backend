const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const {
  generateUserRefreshToken,
  generateUserAccessToken,
  verifyUserRefreshToken,
} = require("../utils/jwt");

async function createUser(name, email, age, password) {
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

async function loginUser(email, password) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    return { error: "User not found" };
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { error: "Invalid password" };
  }
  return {
    accessToken: generateUserAccessToken(user),
    refreshToken: generateUserRefreshToken(user),
  };
}

async function userRefreshToken(token) {
  const decoded = verifyUserRefreshToken(token);
  const user = await userRepository.findUserById(decoded.id);
  if (!user) {
    throw new Error("User not found");
  }
  return {
    accessToken: generateUserAccessToken(user),
    refreshToken: generateUserRefreshToken(user),
  };
}

async function getAllUsers(filters) {
  return userRepository.getAllUsers(filters);
}

module.exports = {
  createUser,
  loginUser,
  userRefreshToken,
  getAllUsers,
};
