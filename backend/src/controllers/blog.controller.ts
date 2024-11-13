import { Request, Response } from "express";
import blogModel from "../models/blog.model";
import { Blog } from "../types/blog";

// Get all blogs
const getBlogs = (req: Request, res: Response): void => {
  const { userId } = req.session;
  const blogs = blogModel.findAll(userId);
  res.json(blogs);
};

// Get blog by id
const getBlogById = (req: Request<{ id: string }>, res: Response): void => {
  const { id } = req.params;
  const blog = blogModel.findById(id);
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  res.json(blog);
};

// Add blog
const addBlog= (
  req: Request<{}, {}, Omit<Blog, "id">>,
  res: Response
): void => {
  const { userId } = req.session;
  const { title, content, published } = req.body;
  if (!title || !userId) {
    res.status(400).json({ message: "Missing title or user id" });
    return;
  }
  const blog = blogModel.create({ title, content, published, userId });
  res.status(201).json(blog);
};

// Update blog by id
const updateBlogById = (
  req: Request<{ id: string }, {}, Partial<Blog>>,
  res: Response
): void => {
  const { userId } = req.session;
  const { id } = req.params;
  const { title, content, published } = req.body;
  const article = blogModel.edit(id, { title, content, published, userId });
  if (!article) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.json(article);
};

// Delete blog by id
const deleteBlogById = (req: Request<{ id: string }>, res: Response) => {
  const { userId } = req.session;
  const { id } = req.params;
  const response = blogModel.delete(id, userId);
  if (!response) {
    res.status(404).json({ message: "Article not found" });
    return;
  }
  res.status(204).send();
};

export default {
  getBlogs,
  getBlogById,
  addBlog,
  updateBlogById,
  deleteBlogById,
};
