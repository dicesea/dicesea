import { IResolvers } from "@graphql-tools/utils";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import { Db, ObjectId } from "mongodb";
import {
  comparePassword,
  generateToken,
  hashPassword,
  processImage,
  validateEmailUniqueness,
  validateUserInput,
} from "../../utils";
import { USERS_COLLECTION } from "../../mongo";
import { IUser } from "../../interfaces";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

interface RegisterUserArgs {
  user: {
    did: string;
    name: string;
    email: string;
    password: string;
    description: string;
    profileImage?: string;
    bannerImage?: string;
    role: string;
  };
}

interface LoginUserArgs {
  user: {
    email: string;
    password: string;
  };
}

interface RegisterUserResult {
  user: IUser; // Replace with the actual type
  token: string;
}

export const userResolver: IResolvers = {
  Query: {
    async getUsers(root: void, args: void, context: Db) {
      try {
        const users = await context
          .collection(USERS_COLLECTION)
          .find()
          .toArray();

        return users;
      } catch (error: any) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
      }
    },
    async getUser(
      root: void,
      args: void,
      { _id }: { _id: string },
      context: Db
    ) {
      try {
        if (!context.collection) {
          throw new Error("Context is missing the collection function");
        }

        const found = await context
          .collection(USERS_COLLECTION)
          .findOne({ _id: new ObjectId(_id) });

        if (!found) {
          throw new Error(`User "${_id}" not found`);
        }

        return found;
      } catch (error: any) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fetch user");
      }
    },
  },
  Mutation: {
    async registerUser(
      parent: any,
      args: RegisterUserArgs,
      context: Db
    ): Promise<RegisterUserResult> {
      try {
        // Extract data from args
        const {
          did,
          name,
          email,
          password,
          description,
          profileImage,
          bannerImage,
          role,
        } = args.user;

        // Validate and process data as needed
        validateUserInput({ did, name, email, password });
        await validateEmailUniqueness(context, email);

        // Hash the password using bcrypt
        const hashedPassword = await hashPassword(password);

        // Upload profile and banner images to Cloudinary if provided
        const profileImageUrl = await processImage(profileImage);
        const bannerImageUrl = await processImage(bannerImage);

        // Generate a user object
        const newUser: IUser = {
          _id: new ObjectId().toString(),
          did,
          name,
          email,
          password: hashedPassword,
          description,
          profileImage: profileImageUrl,
          bannerImage: bannerImageUrl,
          role: role || "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Omit the _id field for insertion
        const newUserForInsertion = { ...newUser, _id: undefined };

        // Insert the user into the MongoDB collection
        const result = await context
          .collection(USERS_COLLECTION)
          .insertOne(newUserForInsertion);

        if (result.acknowledged) {
          // Generate a JWT token for the newly registered user
          const token = generateToken(newUser);

          // Retrieve the created user with its _id
          const createdUser = (await context
            .collection(USERS_COLLECTION)
            .findOne({ _id: new ObjectId(result.insertedId) })) as IUser | null;

          if (!createdUser) {
            throw new Error("Failed to fetch the created user");
          }

          return { user: createdUser, token };
        } else {
          throw new Error("Failed to create user");
        }
      } catch (error: any) {
        console.error("Error registering user:", error);
        throw new Error(error.message); // Rethrow the error to ensure it's propagated
      }
    },
    async loginUser(root: void, args: LoginUserArgs, context: Db) {
      try {
        // Extract data from args
        let { email, password } = args.user;

        // Validate and process data as needed

        // Validate email format
        if (!validator.isEmail(email)) {
          throw new Error("Invalid email format");
        }

        // Trim whitespaces
        email = validator.trim(email);
        password = validator.trim(password);

        // Find the user with the provided email
        const user: any = await context
          .collection(USERS_COLLECTION)
          .findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        // Check if the provided password matches the hashed password
        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // Generate a JWT token for the authenticated user
        const token = generateToken(user);

        return { user, token };
      } catch (error: any) {
        console.error("Error logging in user:", error);
        throw new Error(error.message); // Rethrow the error to ensure it's propagated
      }
    },
  },
};
