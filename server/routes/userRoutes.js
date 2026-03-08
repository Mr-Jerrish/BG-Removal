import express from "express";
import { ClerkWebHooks, userCredits } from "../controllers/usercontroller.js";
import { authUser } from "../middlewares/auth.js";

const router = express.Router();

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  ClerkWebHooks,
);

router.get("/credits", authUser, userCredits);

export default router;
