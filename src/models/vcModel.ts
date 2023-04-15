import mongoose from "mongoose";

const vcSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  phone: String,
  firmName: { type: String },
  investmentFocus: String,
  industriesOfInterest: [String],
  investmentSize: Number,
  preferredCompanyStage: String,
  preferredMetric: String,
  portfolioCompanies: [String],
});

const VC = mongoose.model("VC", vcSchema);

export default VC;
