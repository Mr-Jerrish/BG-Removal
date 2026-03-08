import { Webhook } from "svix";
import userModel from "../models/userModel.js";

export const ClerkWebHooks = async (req, res) => {
  try {
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString();
    const evt = await webhook.verify(payload, {
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
      console.log("User saved in MongoDB ✅");
    }

    if (type === "user.updated") {
      await userModel.findOneAndUpdate(
        { clerkId: data.id },
        {
          email: data.email_addresses?.[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        },
      );
      console.log("User Updated ✅");
    }

    if (type === "user.deleted") {
      await userModel.findOneAndDelete({ clerkId: data.id });
      console.log("User Deleted ✅");
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
    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.json({ success: true, credits: userData.creditBalance });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
