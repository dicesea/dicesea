import { IResolvers } from "@graphql-tools/utils";
import { v2 as cloudinary } from "cloudinary";
import { Db, ObjectId } from "mongodb";
import { COLLECTIONS_COLLECTION } from "../../mongo";
import { ICollection, ITem } from "../../interfaces";
import {
  extractPublicIdFromUrl,
  // generateRandomGradientImage,
  generateUniqueID,
  handleUrl,
} from "../../utils";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const collectionResolver: IResolvers = {
  Query: {
    async getCollections(root: void, args: void, context: Db) {
      try {
        const collections = await context
          .collection(COLLECTIONS_COLLECTION)
          .find()
          .toArray();

        return collections;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getCollection(root: void, { slug }: { slug: string }, context: Db) {
      try {
        const found = await context
          .collection(COLLECTIONS_COLLECTION)
          .findOne({ slug });

        if (!found) {
          throw new Error(`Collection "${slug}" not found`);
        }

        return found;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getItem(root: void, { id }: { id: string }, context: Db) {
      try {
        const collection = await context
          .collection(COLLECTIONS_COLLECTION)
          .findOne({
            "items.id": id,
          });

        if (!collection) {
          throw new Error(`Item ${id}" not found in collection with id`);
        }

        const item = collection.items.find((item: ITem) => item.id === id);

        if (!item) {
          throw new Error(`Item ${id}" not found in collection with id`);
        }

        return item;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getOwnerCollections(
      root: void,
      { owner }: { owner: string },
      context: Db
    ) {
      try {
        const collections = await context
          .collection(COLLECTIONS_COLLECTION)
          .find({ owner })
          .toArray();

        return collections;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
  },
  Mutation: {
    async createCollection(root: void, args: any, context: Db) {
      try {
        // Generate unique slug for each collection
        args.collection.slug = handleUrl(args.collection.name);

        // Generate unique profileImage for each collection
        // args.collection.profileImage = generateRandomGradientImage(500, 500);

        // Generate unique ID for each item
        args.collection.items.forEach((item: ITem) => {
          item.id = generateUniqueID();
        });

        if (args.collection.profileImage) {
          const response = await cloudinary.uploader.upload(
            args.collection.profileImage
          );
          args.collection.profileImage = response.secure_url;
        }
        if (args.collection.bannerImage) {
          const response = await cloudinary.uploader.upload(
            args.collection.bannerImage
          );
          args.collection.bannerImage = response.secure_url;
        }

        await Promise.all(
          args.collection.items.map(async (item: ITem) => {
            if (item.imageUrl) {
              const response = await cloudinary.uploader.upload(item.imageUrl);
              item.imageUrl = response.secure_url;
            }
            return item;
          })
        );

        const regexp = new RegExp(args.collection.name, "i");
        const found = await context
          .collection(COLLECTIONS_COLLECTION)
          .findOne({ name: regexp });

        if (found) {
          // If a collection with the given name already exists, add the new item to its `items` array.
          const updatedItems = [...found.items, ...args.collection.items];
          const result = await context
            .collection(COLLECTIONS_COLLECTION)
            .updateOne({ _id: found._id }, { $set: { items: updatedItems } });

          if (!result.modifiedCount) {
            throw new Error("Failed to add item to existing collection");
          }

          return "Item added to existing collection";
        }

        // If a collection with the given name doesn't exist, create a new one and add the new item to its `items` array.
        await context
          .collection(COLLECTIONS_COLLECTION)
          .insertOne(args.collection);

        return "Collection added successfully";
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async updateCollection(
      root: void,
      { _id, collection }: { _id: string; collection: ICollection },
      context: Db
    ) {
      try {
        await Promise.all(
          collection.items.map(async (item: ITem) => {
            if (item.imageUrl) {
              const response = await cloudinary.uploader.upload(item.imageUrl);
              item.imageUrl = response.secure_url;
            }
            return item;
          })
        );

        const exists = await context
          .collection(COLLECTIONS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (!exists) {
          throw new Error("Collection does not exist");
        }

        const result = await context
          .collection(COLLECTIONS_COLLECTION)
          .updateOne({ _id: new ObjectId(_id) }, { $set: collection });

        if (!result.modifiedCount) {
          throw new Error("Failed to update collection");
        }

        return "Collection updated";
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async deleteCollection(root: void, { _id }: { _id: string }, context: Db) {
      try {
        const collection = await context
          .collection(COLLECTIONS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (!collection) {
          throw new Error("Collection does not exist");
        }

        // Delete the image from Cloudinary
        await Promise.all(
          collection.items.map(async (item: ITem) => {
            if (item.imageUrl) {
              const publicId = extractPublicIdFromUrl(item.imageUrl);
              await cloudinary.uploader.destroy(publicId);
            }
          })
        );

        const result = await context
          .collection(COLLECTIONS_COLLECTION)
          .deleteOne({ _id: new ObjectId(_id) });

        if (!result.deletedCount) {
          throw new Error("Failed to delete collection");
        }

        return "Collection deleted";
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
  },
};
