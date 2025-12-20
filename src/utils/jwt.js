const jwt = require("jsonwebtoken");
const config = require("../config/config");

function generateUserAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.user.accessTokenSecret,
    {
      expiresIn: "15m",
    },
  );
}
function generateUserRefreshToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.user.refreshTokenSecret,
    {
      expiresIn: "7d",
    },
  );
}
function generateAdminAccessToken(admin) {
  return jwt.sign(
    { username: admin.username, role: "Admin" },
    config.admin.accessTokenSecret,
    {
      expiresIn: "15m",
    },
  );
}
function generateAdminRefreshToken(admin) {
  return jwt.sign(
    { username: admin.username, role: "Admin" },
    config.admin.refreshTokenSecret,
    {
      expiresIn: "7d",
    },
  );
}

function verifyUserAccessToken(token) {
  return jwt.verify(token, config.user.accessTokenSecret);
}
function verifyUserRefreshToken(token) {
  return jwt.verify(token, config.user.refreshTokenSecret);
}
function verifyAdminAccessToken(token) {
  return jwt.verify(token, config.admin.accessTokenSecret);
}
function verifyAdminRefreshToken(token) {
  return jwt.verify(token, config.admin.refreshTokenSecret);
}

module.exports = {
  generateUserAccessToken,
  generateUserRefreshToken,
  generateAdminAccessToken,
  generateAdminRefreshToken,
  verifyUserAccessToken,
  verifyUserRefreshToken,
  verifyAdminAccessToken,
  verifyAdminRefreshToken,
};
