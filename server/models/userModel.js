import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    photo: { type: String },
    creditBalance: { type: Number, default: 3 },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
