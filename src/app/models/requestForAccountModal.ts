import mongoose from "mongoose";

const requestForAccountModal = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    key: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("requestForAccount", requestForAccountModal);
