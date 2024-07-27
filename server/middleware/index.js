import jwt from "jsonwebtoken";
import user from "../model/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log(Object.values(req.rawHeaders))

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }

    const userExist = await user.findById(decoded.userId).select("-password");

    if (!userExist) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = userExist;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
