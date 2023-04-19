import Lender from "../models/lenderModel";
import express from "express";
import User from "../models/userModel";
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
    const { formData }: { formData: FormData } = req.body;

    const newUser = new User({
      email: formData.email,
      name: formData.email,
      passwordHash: "unset",
    });
    await newUser.save();

    res.status(200).json({ result: 234234 });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while processing the request." });
  }
});

export default router;
