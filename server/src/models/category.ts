import { model, Schema } from "mongoose";
import { ICategory } from "../interfaces";

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export default model<ICategory>("Category", categorySchema);
