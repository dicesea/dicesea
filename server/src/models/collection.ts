import { model, Schema } from "mongoose";
import { ICollection } from "../interfaces";

const collectionSchema = new Schema<ICollection>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
    creator: { type: String, required: true },
    owner: { type: String, required: true },
    profileImage: { type: String, required: false },
    bannerImage: { type: String, required: false },
    items: [
      {
        id: { type: String, require: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        creator: { type: String, required: true },
        owner: { type: String, required: true },
        collection: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default model<ICollection>("Collection", collectionSchema);
