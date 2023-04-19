import mongoose, { Schema, Document } from "mongoose";

export interface FormData {
  annualRevenue: string;
  currency: string;
  annualGrowthRate: string;
  currentRunway: string;
  termLength: number;
  gracePeriod: string;
  email: string;
}

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
