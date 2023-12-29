import { ITem } from "./ITem";

export interface ICollection {
  name: string;
  slug: string;
  description: string;
  category: string;
  creator: string;
  owner: string;
  bannerImage: string;
  profileImage: string;
  items: ITem[];
}
