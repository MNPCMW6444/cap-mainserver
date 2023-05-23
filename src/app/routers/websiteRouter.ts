import { WebsiteFormData } from "@caphub-group/caphub-types";
import express from "express";
import SavedToDBWebsiteForm from "../models/website/SavedToDBWebsiteForm";
import SavedToDBWebsiteFormClean from "../models/website/SavedToDBWebsiteFormClean";
import userModel from "../models/auth/userModel";
const router = express.Router();

router.post("/calculate", async (req, res) => {
  try {
    const stringifiedFormData = req.body.stringifiedFormData as string;
    const formData: WebsiteFormData = JSON.parse(stringifiedFormData);
    const savedFormData = new SavedToDBWebsiteForm({
      stringifiedFormData,
    });
    await savedFormData.save();
    const usersWithThisEmail = await userModel.find({ email: formData.email });
    if (usersWithThisEmail.length === 0) {
      const savedFormDataClean = new SavedToDBWebsiteFormClean({
        stringifiedFormData,
      });
      await savedFormDataClean.save();
    }
    return res.status(200).json({
      loanAmount: formData.annualRevenue.amount * 0.7,
      interest: 5.7,
      amortization: 342423,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing the request." });
  }
});

export default router;
