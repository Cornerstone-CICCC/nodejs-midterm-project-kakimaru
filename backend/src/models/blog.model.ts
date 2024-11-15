import { v4 as uuidv4 } from "uuid";
import { Blog } from "../types/blog";

class BlogModel {
  private blogs: Blog[] = [];

  findAll(userId: string): Blog[] {
    const blogs = this.blogs.filter((blog) => blog.userId === userId);
    return blogs;
  }

  findById(id: string): Blog | undefined {
    const blog = this.blogs.find((blog) => blog.id === id);
    if (!blog) return undefined;
    return blog;
  }

  create(newData: Omit<Blog, "id">): Blog {
    const newBlog = {
      id: uuidv4(),
      ...newData,
    };
    this.blogs.push(newBlog);
    return newBlog;
  }

  edit(id: string, newData: Partial<Blog>): Blog | undefined {
    const index = this.blogs.findIndex((blog) => blog.id === id);
    if (index === -1) return undefined;
    if (this.blogs[index].userId !== newData.userId) return undefined;

    const updatedBlog = {
      ...this.blogs[index],
      ...newData,
    };
    this.blogs[index] = updatedBlog;
    return updatedBlog;
  }

  delete(id: string, userId: string): boolean {
    const index = this.blogs.findIndex(
      (blog) => blog.id === id && blog.userId === userId
    );
    if (index === 1) return false;
    this.blogs.splice(index, 1);
    return true;
  }
}

export default new BlogModel();
