import { ISocial } from "@/interfaces";

export const social: ISocial = {
  cover: "/images/cover.svg",
  email: "dicesea.io@gmail.com",
  github: "https://github.com/dicesea",
  instagram: "https://www.instagram.com/dicesea",
  x: "https://x.com/dicesea",
  linkedIn: "https://www.linkedin.com/company/dicesea",
  phone: "+2348141598304",
  youtube: "https://www.youtube.com/@dicesea",
  facebook: "https://web.facebook.com/dicesea",
  telegram: "https://t.me/dicesea",
  tiktok: "https://www.tiktok.com/@dicesea",
};

export const links = [
  {
    title: "Art",
    url: "/category/art",
  },
  {
    title: "Music",
    url: "/category/music",
  },
  {
    title: "Book",
    url: "/category/book",
  },
];

export const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== "string") {
    throw new Error("Input must be a string");
  }

  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
