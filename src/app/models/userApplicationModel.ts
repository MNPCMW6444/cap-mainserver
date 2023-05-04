import mongoose, { Schema } from "mongoose";
import { CapHubUser } from "@caphub-group/caphub-types";

const UserApplicationSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

export default mongoose.model<any>("UserApplication", UserApplicationSchema);
