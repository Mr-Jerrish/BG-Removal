import express from "express";
import { ClerkWebHooks, userCredits } from "../controllers/userController.js";
import { authUser } from "../middlewares/auth.js";

const router = express.Router();

// Webhook route (raw body required)
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  ClerkWebHooks,
);

// Credits route (authenticated)
router.get("/credits", authUser, userCredits);

export default router;
