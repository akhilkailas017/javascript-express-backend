const { verifyUserAccessToken } = require("../utils/jwt");

function userAuthMiddleware(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = verifyUserAccessToken(token);
    if (decoded.role !== "User") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error: error });
  }
}

module.exports = userAuthMiddleware;
