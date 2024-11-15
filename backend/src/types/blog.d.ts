export type Blog = {
  id: string;
  title: string;
  content: string;
  published: boolean,
  userId: string; // Foreign Key
}