import { createCanvas } from "canvas";

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
