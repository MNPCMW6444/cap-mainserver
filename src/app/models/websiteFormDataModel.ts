import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  formData: FormData;
}

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

export default mongoose.model<UserType>("User", UserSchema);
