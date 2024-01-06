// import { createCanvas } from "canvas";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IUser } from "../interfaces";
import { USERS_COLLECTION } from "../mongo/users";
import { Db } from "mongodb";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";

const saltRounds = 10;

// export const getRandomColor = (): string => {
//   const letters = "0123456789ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// };

// export const generateRandomGradientImage = (
//   width: number,
//   height: number
// ): string => {
//   const canvas = createCanvas(width, height);
//   const ctx = canvas.getContext("2d");

//   // Generate random colors
//   const color1 = getRandomColor();
//   const color2 = getRandomColor();

//   // Create gradient
//   const gradient = ctx.createLinearGradient(0, 0, width, height);
//   gradient.addColorStop(0, color1);
//   gradient.addColorStop(1, color2);

//   // Fill the canvas with the gradient
//   ctx.fillStyle = gradient;
//   ctx.fillRect(0, 0, width, height);

//   // Convert canvas to data URL
//   const dataURL = canvas.toDataURL("image/png");

//   return dataURL;
// };

export const extractPublicIdFromUrl = (url: string): string => {
  const parts = url.split("/");
  const filename = parts.pop();
  const publicId = filename!.split(".")[0];
  return publicId;
};

export function generateUniqueID() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const uniqueID = Math.floor(Math.random() * (max - min + 1)) + min;
  return uniqueID.toString();
}

export const addHyphens = (str: string) => {
  return str.replace(/ /g, "-");
};

export const handleUrl = (url: string): string => {
  let transformedUrl = url.toLowerCase();
  transformedUrl = addHyphens(transformedUrl);
  return transformedUrl;
};

// Implement a function to hash the user's password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(
  enteredPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, hashedPassword);
}

// Implement a function to generate a JWT token
export function generateToken(user: IUser): string {
  const secretKey = process.env.JWT_SECRET || "your-secret-key";
  return jwt.sign({ userId: user._id }, secretKey, { expiresIn: "1h" });
}

export async function validateUserInput({ name, email, password }: any) {
  // Validate all input fields
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email address");
  }
}

export async function validateEmailUniqueness(context: Db, email: string) {
  // Validate email uniqueness
  const existingUser = await context
    .collection(USERS_COLLECTION)
    .findOne({ email });
  if (existingUser) {
    throw new Error("Email is already in use");
  }
}

export async function processImage(imageUrl: string | undefined) {
  // Process image and return the URL
  if (imageUrl && !imageUrl.startsWith("https://res.cloudinary.com")) {
    const uploadedImage = await cloudinary.uploader.upload(imageUrl);
    return uploadedImage.secure_url;
  }
  return imageUrl;
}
