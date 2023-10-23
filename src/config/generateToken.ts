const jwt = require("jsonwebtoken");
const generateToken = async (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
