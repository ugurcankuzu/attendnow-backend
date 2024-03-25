const jwt = require("jsonwebtoken");
function createJWT(payload) {
  const secret = process.env.JWT_SECRET_KEY;
  const opt = {
    expiresIn: "5h",
    algorithm: "HS256",
  };
  return jwt.sign(payload, secret, opt);
}

module.exports = createJWT;
