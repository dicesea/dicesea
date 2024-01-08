import { toast } from "@/components/toast";
import { ISocial } from "@/interfaces";
import { toUpper } from "lodash-es";

export const social: ISocial = {
  cover: "/images/m.jpg",
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

export const items = [
  {
    _id: "1",
    name: "Fruit World",
    description: "This is a fruit",
    price: "100",
    imageUrl: "/images/m.jpg",
    category: "ART",
    status: "",
    user: {
      _id: "2",
      name: "",
      description: "",
      creator: "did:ethr:0x123456789",
      owner: "0x123456789",
      profileImage: "/images/m.jpg",
      bannerImage: "/images/m.jpg",
      role: "",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  },
  {
    _id: "1",
    name: "Fruit World",
    description: "This is a fruit",
    price: "100",
    imageUrl: "/images/m.jpg",
    category: "ART",
    status: "",
    user: {
      _id: "2",
      name: "",
      description: "",
      creator: "did:ethr:0x123456789",
      owner: "0x123456789",
      profileImage: "/images/m.jpg",
      bannerImage: "/images/m.jpg",
      role: "",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  },
  {
    _id: "2",
    name: "Fruit World",
    description: "This is a fruit",
    price: "100",
    imageUrl: "/images/m.jpg",
    category: "ART",
    status: "",
    user: {
      _id: "2",
      name: "",
      description: "",
      creator: "did:ethr:0x123456789",
      owner: "0x123456789",
      profileImage: "/images/m.jpg",
      bannerImage: "/images/m.jpg",
      role: "",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  },
  {
    _id: "3",
    name: "Fruit World",
    description: "This is a fruit",
    price: "100",
    imageUrl: "/images/m.jpg",
    category: "ART",
    status: "",
    user: {
      _id: "2",
      name: "",
      description: "",
      creator: "did:ethr:0x123456789",
      owner: "0x123456789",
      profileImage: "/images/m.jpg",
      bannerImage: "/images/m.jpg",
      role: "",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  },
  {
    _id: "4",
    name: "Fruit World",
    description: "This is a fruit",
    price: "100",
    imageUrl: "/images/m.jpg",
    category: "ART",
    status: "",
    user: {
      _id: "2",
      name: "",
      description: "",
      creator: "did:ethr:0x123456789",
      owner: "0x123456789",
      profileImage: "/images/m.jpg",
      bannerImage: "/images/m.jpg",
      role: "",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  },
  {
    _id: "5",
    name: "Fruit World",
    description: "This is a fruit",
    price: "100",
    imageUrl: "/images/m.jpg",
    category: "BOOK",
    status: "",
    user: {
      _id: "2",
      name: "",
      description: "",
      creator: "did:ethr:0x123456789",
      owner: "0x123456789",
      profileImage: "/images/m.jpg",
      bannerImage: "/images/m.jpg",
      role: "",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    },
  },
];

export const routers = [
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

export const trimInputSpaces = (input: string): string => {
  return input.trim();
};

export const categories = [
  { label: "Art", value: "ART" },
  { label: "Music", value: "MUSIC" },
  { label: "Book", value: "BOOK" },
];

export const schema = {
  context: "https://schema.org/",
  type: "Record",
  get uri() {
    return this.context + this.type;
  },
};

export const shortDid = (did: string) => {
  return did.slice(0, 8) + "..." + did.slice(-4);
};

export const replaceSpacesWithHyphens = (inputString: string) => {
  return inputString.replace(/\s+/g, "-");
};

export function removeDidPrefix(text: string) {
  return toUpper(text.slice(8, 14));
}

export const handleRefresh = () => {
  window.location.reload();
};

export const handleSuccess = (message: string, onClose: () => void) => {
  toast({
    message: message,
    position: "bottom",
  });
  onClose();
};

export const handleError = (message: string, onClose: any) => {
  toast({
    message: message,
    position: "bottom",
  });
  onClose();
};

export const handleCopy = (text: string) => {
  navigator.clipboard.writeText(text);
  try {
    toast({
      message: "Copied",
      position: "bottom",
    });
  } catch (error) {
    console.log(error);
  }
};

export const tokenName = "ds-token";

export const saveToken = (token: any) => {
  localStorage.setItem(tokenName, JSON.stringify(token));
};

export const retrieveToken = () => {
  const token = localStorage.getItem(tokenName);
  if (!token) return null;
  return JSON.parse(token);
};

export const deleteToken = () => {
  localStorage.removeItem(tokenName);
};
