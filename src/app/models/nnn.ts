import mongoose from "mongoose";

const NNNodal = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("NNN", NNNodal);
