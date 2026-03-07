import { Webhook } from "svix";
import userModel from "../models/userModel.js";

export const ClerkWebHooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body;

    const evt = webhook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    console.log("Webhook Event:", type);

    if (type === "user.created") {
      await userModel.create({
        clerkId: data.id,
        email: data.email_addresses[0].email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        photo: data.image_url,
      });

      console.log("User saved in MongoDB");
    }

    res.json({ success: true });
  } catch (error) {
    console.log("Webhook Error:", error.message);
    res.status(500).json({ success: false });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const userData = await userModel.findOne({ clerkId });

    res.json({
      success: true,
      credits: userData.credit,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
