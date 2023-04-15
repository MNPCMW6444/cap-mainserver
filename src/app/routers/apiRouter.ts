import Lender from "../models/lenderModel";
import express from "express";

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

export default router;
