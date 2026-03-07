import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

// Only JSON parser for normal routes
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// Health check
app.get("/", (req, res) => {
  res.send("BG Removal API Running 🚀");
});

// User routes
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} ✅`));
