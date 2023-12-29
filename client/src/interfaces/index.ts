export interface ISocial {
  instagram: string;
  x: string;
  email: string;
  github: string;
  linkedIn: string;
  phone: string;
  youtube: string;
  cover: string;
  facebook: string;
  telegram: string;
  tiktok: string;
}

export interface IBanner {
  title: string;
  backgroundImage: string;
}

export interface Item {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  owner: string;
  creator: string;
  collection: string;
}

export interface IUser {
  _id: string;
  name: string;
  description: string;
  owner: string;
  creator: string;
  profileImage: string;
  bannerImage: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRecord {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
  status: string;
  user: IUser;
}

export interface ICard {
  records: IRecord[];
  title: string;
  route: string;
}

export interface ISlug {
  items: Item[];
  title: string;
  route: string;
}

export interface IFrame {
  videoId: string;
}

export interface IToast {
  message: string;
  position: string;
}

export interface ISchema {
  context: string;
  type: string;
  uri: string;
}

export interface ITem {
  id: string;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  owner: string;
  creator: string;
  collection: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  name: string; // Art, Sport, Gaming
  slug: string; // gaming, art, sport
  image: string; // image url
}
