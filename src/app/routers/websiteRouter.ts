import { WebsiteFormData } from "@caphub-funding/caphub-types";
import express from "express";
import SavedToDBWebsiteForm from "../models/SavedToDBWebsiteForm";
const router = express.Router();

router.post("/calculate", async (req, res) => {
  try {
    const stringifiedFormData = req.body.stringifiedFormData as string;
    const formData: WebsiteFormData = JSON.parse(stringifiedFormData);
    const savedFormData = new SavedToDBWebsiteForm({
      stringifiedFormData,
    });
    await savedFormData.save();
    return res.status(200).json({
      loanAmount: parseInt(formData.annualRevenue) * 0.7,
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