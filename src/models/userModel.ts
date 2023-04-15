import mongoose from "mongoose";

const userModal = new mongoose.Schema(
  {
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    NAme: {
      type: String,
      required: true,
    },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userModal);
