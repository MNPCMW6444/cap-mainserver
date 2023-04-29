import { SavedWebsiteFormData } from "@caphub-funding/caphub-types";
import mongoose, { Schema } from "mongoose";

const SavedToDBWebsiteFormSchema = new Schema(
  {
    stringifiedFormData: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<SavedWebsiteFormData>(
  "SavedToDBWebsiteForm",
  SavedToDBWebsiteFormSchema
);
