const bcrypt = require("bcrypt");
const config = require("../config/config");
const {
  generateAdminAccessToken,
  generateAdminRefreshToken,
  verifyAdminRefreshToken,
} = require("../utils/jwt");

async function loginAdmin(email, password) {
  const adminEmail = config.admin.email;
  const adminPassword = config.admin.passwordHash;

  if (email !== adminEmail) {
    return { error: "Admin not found" };
  }
  const isPasswordValid = await bcrypt.compare(password, adminPassword);
  if (!isPasswordValid) {
    return { error: "Invalid password" };
  }

  return {
    accessToken: generateAdminAccessToken(adminEmail),
    refreshToken: generateAdminRefreshToken(adminEmail),
  };
}

async function adminRefreshToken(token) {
  const decoded = verifyAdminRefreshToken(token);
  if (decoded.email !== config.admin.email) {
    throw new Error("Admin not found");
  }
  return {
    accessToken: generateAdminAccessToken(decoded.email),
    refreshToken: generateAdminRefreshToken(decoded.email),
  };
}

module.exports = {
  loginAdmin,
  adminRefreshToken,
};
