import Lender from "../models/lenderModel";
import express from "express";
import User from "../models/userModel";
import { WebsiteFormData } from "@caphub-funding/caphub-types";
const router = express.Router();

router.get("/lenders/suitable", async (req, res) => {
  try {
    const {
      minDryPowder,
      maxDryPowder,
      primaryInvestorType,
      hqCountry,
      sector,
    } = req.query;

    const allLenders = await Lender.find();

    res.status(200).json({ suitableLendersCount: allLenders.length });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing the request." });
  }
});

router.post("/calculate", async (req, res) => {
  try {
    const { formData }: { formData: WebsiteFormData } = req.body;

    if ((await User.find({ email: formData.email })).length > 0)
      return res.status(400).json({
        message: `This email is assosiated with an existing caphub account.
             Please Login to the platform to continue
            or use a different email address.`,
      });

    const newUser = new User({
      email: formData.email,
      name: formData.email,
      passwordHash: "unset",
    });
    await newUser.save();

    const {
      annualRevenue,
      currency,
      annualGrowthRate,
      currentRunway,
      termLength,
      gracePeriod,
      email,
    } = formData;

    const arr = parseFloat(annualRevenue);

    res.status(200).json({ result: 234234 });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing the request." });
  }
});

export default router;
