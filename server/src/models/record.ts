import { model, Schema } from "mongoose";
import { IRecord } from "../interfaces";

const recordSchema = new Schema<IRecord>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    owner: { type: String, required: true },
    creator: { type: String, required: true },
    user: {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      description: { type: String, required: true },
      profileImage: { type: String, required: true },
      bannerImage: { type: String, required: true },
      role: { type: String, required: true },
      createdAt: { type: Date, required: true },
      updatedAt: { type: Date, required: true },
    },
  },
  { timestamps: true }
);

export default model<IRecord>("Record", recordSchema);
