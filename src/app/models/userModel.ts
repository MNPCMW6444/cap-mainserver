import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  email: string;
  name: string;
  passwordHash: string;
}

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

export default mongoose.model<UserType>("User", UserSchema);
