import mongoose, { Schema } from "mongoose";
import { CaphubUser } from "@caphub-group/caphub-types";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    passwordHash: { type: String, required: true },
    twoFactorSecret: { type: String },
    isTwoFactorEnabled: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CaphubUser>("User", UserSchema);
