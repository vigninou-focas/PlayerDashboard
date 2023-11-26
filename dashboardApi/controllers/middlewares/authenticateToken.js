const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Accès refusé.");

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.status(403).send("Token non valide.");
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
