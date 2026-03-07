import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI);
const app = express();
app.use(cors());
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
