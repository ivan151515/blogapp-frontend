import { Blog } from "./blog";
import { Profile } from "./profile";

export type User = {
  username: string;
  name: string;
  id: number;
  blogs?: Blog[];
  profile?: Profile;
};
