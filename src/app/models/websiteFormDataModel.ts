import { SavedWebsiteFormData } from "@caphub-funding/caphub-types";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    formData: {
      type: FormData,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<SavedWebsiteFormData>("User", UserSchema);
