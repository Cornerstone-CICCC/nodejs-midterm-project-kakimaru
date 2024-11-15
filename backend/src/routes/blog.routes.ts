import { Router } from "express";
import { checkAuth } from "../middleware/auth";
import blogController from "../controllers/blog.controller";

const blogRouter = Router()

blogRouter.post('/add', checkAuth, blogController.addBlog)
blogRouter.put('/update/:id', checkAuth, blogController.updateBlogById)
blogRouter.delete('/delete/:id', checkAuth, blogController.deleteBlogById)
blogRouter.get('/:id', checkAuth, blogController.getBlogById)
blogRouter.get('/', checkAuth, blogController.getBlogs)

export default blogRouter