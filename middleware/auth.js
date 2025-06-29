const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({ msg: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next(); // move on to the next middleware or route
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = authenticate;
