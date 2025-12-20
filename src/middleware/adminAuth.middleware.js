const { verifyAdminAccessToken } = require("../utils/jwt");

function adminAuthMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = verifyAdminAccessToken(token);
    if (decoded.role !== "Admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = adminAuthMiddleware;
