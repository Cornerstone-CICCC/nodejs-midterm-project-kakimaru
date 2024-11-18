import { Request, Response } from "express";
import blogModel from "../models/blog.model";
import { Blog } from "../types/blog";

// Get all blogs
const getBlogs = (req: Request, res: Response): void => {
  const { userId } = req.session;
  const blogs = blogModel.findAll(userId);
  res.json(blogs);
};

/*
// Get blogs with pagination
const getBlogs = (req: Request, res: Response): void => {
  const { userId } = req.session;
  const { page = 1, limit = 10 } = req.query;

  const pageNumber = parseInt(page as string, 10);
  const limitNumber = parseInt(limit as string, 10); // 1ページあたりの件数

  if (pageNumber < 1 || limitNumber < 1) {
    res.status(400).json({ error: "Page and limit must be positive integers." });
    return;
  }

  // 全てのブログデータを取得
  const allBlogs = blogModel.findAll(userId);

  // ページネーションの開始と終了インデックスを計算
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;

  // 現在のページのデータをスライス
  const blogs = allBlogs.slice(startIndex, endIndex);

  // 総ページ数を計算
  const totalPages = Math.ceil(allBlogs.length / limitNumber);

  res.json({
    currentPage: pageNumber,
    totalPages,
    totalItems: allBlogs.length,
    items: blogs,
  });
};
*/

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
