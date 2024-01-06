export interface IUser {
  _id: string;
  did: string;
  name: string;
  email: string;
  password: string;
  description: string;
  profileImage: string | undefined;
  bannerImage: string | undefined;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
