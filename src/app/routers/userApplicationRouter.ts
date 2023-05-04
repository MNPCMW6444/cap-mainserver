import express from "express";
import UserApplication from "../models/userApplicationModel";
import { WebsiteFormData } from "@caphub-group/caphub-types";
import SavedToDBWebsiteForm from "../models/SavedToDBWebsiteForm";
import userModel from "../models/userModel";
import SavedToDBWebsiteFormClean from "../models/SavedToDBWebsiteFormClean";

const router = express.Router();

router.get("/", async (req, res) => {
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
