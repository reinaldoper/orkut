import { IComments } from "./IComments";

export interface IPost {
  id: number;
  title: string;
  content: string;
  likes: number;
  userId: number;
  categoryId: number;
}

export interface IPostByCategory {
  id: number;
  name: string;
  posts: IPost[];
  comments: IComments[];
}
