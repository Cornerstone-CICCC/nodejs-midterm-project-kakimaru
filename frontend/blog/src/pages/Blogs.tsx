import { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { Blog } from '../types/blog';

export default function MyPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://localhost:3000/blogs`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data;
  }

  useEffect(function () {
    async function getBlogs() {
      const data = await fetchBlogs();
      setBlogs(data);
    }
    getBlogs();
  }, []);

  return (
    <div className="px-6 py-20">
      <div className='grid gap-6'>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
