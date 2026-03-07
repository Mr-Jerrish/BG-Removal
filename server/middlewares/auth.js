import jwt from "jsonwebtoken";

export const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "No token found" });
    }
    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
