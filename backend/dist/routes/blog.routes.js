"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
const blogRouter = (0, express_1.Router)();
blogRouter.post('/add', auth_1.checkAuth, blog_controller_1.default.addBlog);
blogRouter.put('/update/:id', auth_1.checkAuth, blog_controller_1.default.updateBlogById);
blogRouter.delete('/delete/:id', auth_1.checkAuth, blog_controller_1.default.deleteBlogById);
blogRouter.get('/:id', auth_1.checkAuth, blog_controller_1.default.getBlogById);
blogRouter.get('/', auth_1.checkAuth, blog_controller_1.default.getBlogs);
exports.default = blogRouter;
