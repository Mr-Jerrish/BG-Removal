import express from "express";
import { ClerkWebHooks } from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.post("/webhook", ClerkWebHooks);

export default userRouter;
