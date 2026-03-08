import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token found" });

    const decoded = jwt.decode(token);

    req.user = { clerkId: decoded.sub };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
