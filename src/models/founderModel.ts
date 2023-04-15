import mongoose from "mongoose";

const startupSchema = new mongoose.Schema({
  founder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Founder",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  title: { type: String, required: true },
  startupName: { type: String, required: true },
  website: String,
  location: { type: String, required: true },
  primaryGoal: { type: String, required: true },
  industry: { type: String, required: true },
  fundingRaised: Number,
  fundingStage: String,
  pitch: { type: String, required: true },
  mrr: Number,
  cac: Number,
  ltv: Number,
  churnRate: Number,
  grossMargin: Number,
  growthRate: Number,
  fundingAmount: Number,
  creditScore: String,
  bankruptcy: String,
  businessStart: String,
  dataRequest2: String,
  dataRequest3a: String,
  dataRequest3b: String,
  dataRequest4: String,
  dataRequest5: String,
  dataRequest6: String,
  dataRequest7: String,
  dataRequest8: String,
  dataRequest9: String,
  dataRequest10: String,
  marketResearch: String,
  productRoadmap: String,
});

const Startup = mongoose.model("Startup", startupSchema);

export default Startup;
