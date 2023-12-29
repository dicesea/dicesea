import { IUser } from "./IUser";

export interface IRecord {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  category: string;
  status: string;
  owner: string;
  creator: string;
  user: IUser;
}
