const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied.No token");
  try {
    const decode = jwt.verify(token, process.env.JWT_privateKey);
    req.user = decode
    next()
  } catch (Exception) {
    res.status(400).send("Invalid Token !");
  }
}
