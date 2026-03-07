import express from "express";
import { ClerkWebHooks, userCredits } from "../controllers/usercontroller.js";
import { authUser } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/webhook", ClerkWebHooks);
userRouter.get("/credits", authUser, userCredits);

export default userRouter;
