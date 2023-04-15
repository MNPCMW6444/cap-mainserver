import mongoose from "mongoose";

const lenderSchema = new mongoose.Schema({
  investorID: String,
  hqCountry: String,
  investorName: String,
  description: String,
  investorStatus: String,
  primaryInvestorType: String,
  AUM: Number,
  dryPowder: Number,
  investmentProfessionalCount: Number,
  yearFounded: Number,
  website: String,
  hqCity: String,
  investments: Number,
  totalInvestments: Number,
  activePortfolio: Number,
  totalActivePortfolio: Number,
  investmentsInTheLast7Days: Number,
  investmentsInTheLast6Months: Number,
  investmentsInTheLast12Months: Number,
  investmentsInTheLast2Years: Number,
  investmentsInTheLast5Years: Number,
  totalInvestmentsInTheLast7Days: Number,
  totalInvestmentsInTheLast6Months: Number,
  totalInvestmentsInTheLast12Months: Number,
  totalInvestmentsInTheLast2Years: Number,
  totalInvestmentsInTheLast5Years: Number,
  exits: Number,
  totalExits: Number,
  lastUpdated: Date,
});

const Lender = mongoose.model("Lender", lenderSchema);

export default Lender;
