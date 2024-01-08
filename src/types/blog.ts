import { User } from "./user";

export type Comment = {
  content: string;
  id: number;
  userId: number;
  blogId: number;
};

export type Blog = {
  content: string;
  important: boolean;
  userId?: number;
  id?: number;
  date?: string;
  user?: User;
  comments?: Comment[];
};
