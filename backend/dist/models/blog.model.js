"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class BlogModel {
    constructor() {
        this.blogs = [];
    }
    findAll(userId) {
        const blogs = this.blogs.filter((blog) => blog.userId === userId);
        return blogs;
    }
    findById(id) {
        const blog = this.blogs.find((blog) => blog.id === id);
        if (!blog)
            return undefined;
        return blog;
    }
    create(newData) {
        const newBlog = Object.assign({ id: (0, uuid_1.v4)() }, newData);
        this.blogs.push(newBlog);
        return newBlog;
    }
    edit(id, newData) {
        const index = this.blogs.findIndex((blog) => blog.id === id);
        if (index === -1)
            return undefined;
        if (this.blogs[index].userId !== newData.userId)
            return undefined;
        const updatedBlog = Object.assign(Object.assign({}, this.blogs[index]), newData);
        this.blogs[index] = updatedBlog;
        return updatedBlog;
    }
    delete(id, userId) {
        const index = this.blogs.findIndex((blog) => blog.id === id && blog.userId === userId);
        if (index === 1)
            return false;
        this.blogs.splice(index, 1);
        return true;
    }
}
exports.default = new BlogModel();
