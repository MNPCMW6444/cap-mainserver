import mongoose, { Schema } from "mongoose";
import { CapHubUser } from "@caphub-group/caphub-types";

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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CapHubUser>("User", UserSchema);
