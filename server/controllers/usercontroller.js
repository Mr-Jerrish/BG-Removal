import { Webhook } from "svix";
import userModel from "../models/userModel.js";

export const ClerkWebHooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString(); // convert buffer to string

    const evt = await webhook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;

    console.log("Webhook event:", type);

    switch (type) {
      case "user.created":
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);

        console.log("User Created");

        break;

      case "user.updated":
        await userModel.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo: data.image_url,
          },
        );

        console.log("User Updated");
        break;

      case "user.deleted":
        await userModel.findOneAndDelete({ clerkId: data.id });
        console.log("User Deleted");
        break;
    }

    res.json({ success: true });
  } catch (error) {
    console.log("Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const userCredits = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });
    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};
