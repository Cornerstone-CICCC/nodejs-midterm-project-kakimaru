"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blog_model_1 = __importDefault(require("../models/blog.model"));
// Get all blogs
const getBlogs = (req, res) => {
    const { userId } = req.session;
    const blogs = blog_model_1.default.findAll(userId);
    res.json(blogs);
};
// Get blog by id
const getBlogById = (req, res) => {
    const { id } = req.params;
    const blog = blog_model_1.default.findById(id);
    if (!blog) {
        res.status(404).json({ message: "Blog not found" });
        return;
    }
    res.json(blog);
};
// Add blog
const addBlog = (req, res) => {
    const { userId } = req.session;
    const { title, content, published } = req.body;
    if (!title || !userId) {
        res.status(400).json({ message: "Missing title or user id" });
        return;
    }
    const blog = blog_model_1.default.create({ title, content, published, userId });
    res.status(201).json(blog);
};
// Update blog by id
const updateBlogById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const { title, content, published } = req.body;
    const article = blog_model_1.default.edit(id, { title, content, published, userId });
    if (!article) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.json(article);
};
// Delete blog by id
const deleteBlogById = (req, res) => {
    const { userId } = req.session;
    const { id } = req.params;
    const response = blog_model_1.default.delete(id, userId);
    if (!response) {
        res.status(404).json({ message: "Article not found" });
        return;
    }
    res.status(204).send();
};
exports.default = {
    getBlogs,
    getBlogById,
    addBlog,
    updateBlogById,
    deleteBlogById,
};
