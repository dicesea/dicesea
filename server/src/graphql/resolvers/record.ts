import { IResolvers } from "@graphql-tools/utils";
import { v2 as cloudinary } from "cloudinary";
import { Db, ObjectId } from "mongodb";
import { RECORDS_COLLECTION } from "../../mongo";
import { IRecord, IUser } from "../../interfaces";
import { extractPublicIdFromUrl } from "../../utils";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const recordResolver: IResolvers = {
  Query: {
    async getPendingRecords(root: void, args: void, context: Db) {
      try {
        // Filter records based on the status field
        const records = await context
          .collection(RECORDS_COLLECTION)
          .find({ status: "PENDING" }) // Add this filter
          .toArray();

        return records;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getApprovedRecords(root: void, args: void, context: Db) {
      try {
        // Filter records based on the status field
        const records = await context
          .collection(RECORDS_COLLECTION)
          .find({ status: "APPROVED" }) // Add this filter
          .toArray();

        return records;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getRejectedRecords(root: void, args: void, context: Db) {
      try {
        // Filter records based on the status field
        const records = await context
          .collection(RECORDS_COLLECTION)
          .find({ status: "REJECTED" }) // Add this filter
          .toArray();

        return records;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getRecord(root: void, { _id }: { _id: string }, context: Db) {
      try {
        const found = await context
          .collection(RECORDS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (!found) {
          throw new Error(`Record "${_id}" not found`);
        }

        return found;
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async getOwnerRecords(
      root: void,
      { owner }: { owner: string },
      context: Db
    ) {
      try {
        const collections = await context
          .collection(RECORDS_COLLECTION)
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
    async createRecord(root: void, args: any, context: Db) {
      try {
        // Extract data from args
        const {
          name,
          description,
          imageUrl,
          price,
          category,
          owner,
          creator,
          user,
        } = args.record;

        // Validate and process data as needed

        // Upload the image to Cloudinary if an image URL is provided
        let imageUrlInCloudinary = imageUrl;
        if (imageUrl && !imageUrl.startsWith("https://res.cloudinary.com")) {
          const uploadedImage = await cloudinary.uploader.upload(imageUrl);
          imageUrlInCloudinary = uploadedImage.secure_url;
        }

        // Generate a record object
        const newRecord = {
          name,
          description,
          imageUrl: imageUrlInCloudinary,
          price,
          category,
          owner,
          creator,
          status: "PENDING", // Set the initial status to "pending"
          user: {
            ...user,
            role: "USER", // Set the initial role to "user"
          },
        };

        // Insert the record into the MongoDB collection
        const result = await context
          .collection(RECORDS_COLLECTION)
          .insertOne(newRecord);

        if (result.acknowledged) {
          // Retrieve the created record with its _id
          const createdRecord = await context
            .collection(RECORDS_COLLECTION)
            .findOne({ _id: result.insertedId });

          return createdRecord;
        } else {
          throw new Error("Failed to create record");
        }
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message); // Rethrow the error to ensure it's propagated
      }
    },
    async updateRecord(
      root: void,
      { _id, record }: { _id: string; record: IRecord },
      context: Db
    ) {
      try {
        // Check if the record exists
        const exists = await context
          .collection(RECORDS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (!exists) {
          throw new Error("Record does not exist");
        }

        // Check if the caller is the owner of the record
        // if (exists.user.id !== context.user.id) {
        //   throw new Error("Unauthorized: You are not the owner of this record");
        // }

        // Check if the image URL is updated
        if (
          record.imageUrl &&
          !record.imageUrl.startsWith("https://res.cloudinary.com")
        ) {
          // Upload the updated image to Cloudinary
          const uploadedImage = await cloudinary.uploader.upload(
            record.imageUrl
          );
          record.imageUrl = uploadedImage.secure_url;
        }

        const result = await context
          .collection(RECORDS_COLLECTION)
          .updateOne({ _id: new ObjectId(_id) }, { $set: record });

        if (!result.modifiedCount) {
          throw new Error("Failed to update collection");
        }

        return "Collection updated";
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async deleteRecord(root: void, { _id }: { _id: string }, context: Db) {
      try {
        const record = await context
          .collection(RECORDS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (!record) {
          throw new Error("Collection does not exist");
        }

        // Check if the caller is the owner of the record
        // if (record.user.id !== context.user.id) {
        //   throw new Error("Unauthorized: You are not the owner of this record");
        // }

        // Delete the image from Cloudinary
        if (record.imageUrl) {
          const publicId = extractPublicIdFromUrl(record.imageUrl);
          await cloudinary.uploader.destroy(publicId);
        }

        const result = await context
          .collection(RECORDS_COLLECTION)
          .deleteOne({ _id: new ObjectId(_id) });

        if (!result.deletedCount) {
          throw new Error("Failed to delete record");
        }

        return "Record deleted";
      } catch (error: any) {
        console.log(error);
        return error.message;
      }
    },
    async approveRecord(root: void, { _id }: { _id: string }, context: any) {
      try {
        // Check if the user is authenticated and has admin role
        // if (!context.authenticated || context.user.role !== "ADMIN") {
        //   throw new Error("Unauthorized");
        // }

        // Update the status of the record to "APPROVED"
        const result = await context
          .collection(RECORDS_COLLECTION)
          .updateOne(
            { _id: new ObjectId(_id) },
            { $set: { status: "APPROVED" } }
          );

        if (result.modifiedCount === 1) {
          return "Record approved successfully";
        } else {
          throw new Error("Failed to approve record");
        }
      } catch (error: any) {
        console.error("Error approving record:", error);
        throw new Error("Failed to approve record");
      }
    },
    async rejectRecord(root: void, { _id }: { _id: string }, context: any) {
      try {
        // Check if the user is authenticated and has admin role
        // if (!context.authenticated || context.user.role !== "ADMIN") {
        //   throw new Error("Unauthorized");
        // }

        // Update the status of the record to "REJECTED"
        const result = await context
          .collection(RECORDS_COLLECTION)
          .updateOne(
            { _id: new ObjectId(_id) },
            { $set: { status: "REJECTED" } }
          );

        if (result.modifiedCount === 1) {
          return "Record rejected successfully";
        } else {
          throw new Error("Failed to reject record");
        }
      } catch (error: any) {
        console.error("Error rejecting record:", error);
        throw new Error("Failed to reject record");
      }
    },
  },
};
