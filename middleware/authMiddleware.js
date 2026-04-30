import jwt from "jsonwebtoken";
import User from "../models/User.js";
import process from "process";

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized, No token" });

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = {  ...user._doc };
    next();
  } catch (error) {
    console.error("Auth error: ", error);
    res.status(401).json({ message: error.message });
  }
};

export default protect;
