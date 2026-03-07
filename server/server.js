import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

// webhook needs raw body
app.use("/api/user/webhook", express.raw({ type: "application/json" }));

// other APIs
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("BG Removal API Running 🚀");
});

app.use("/api/user", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
