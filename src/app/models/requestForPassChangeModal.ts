import mongoose from "mongoose";

const requestForPassChangeModal = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    uuid: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "requestForPassChange",
  requestForPassChangeModal
);
