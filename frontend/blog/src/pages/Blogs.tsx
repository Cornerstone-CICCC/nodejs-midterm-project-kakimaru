import { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { Blog } from '../types/blog';
import { Link } from 'react-router-dom';
import { useBlogs } from '../context/BlogsContext';

export default function Blogs() {
  const { blogs, setBlogs } = useBlogs();

  async function fetchBlogs(): Promise<Blog[]> {
    const res = await fetch(`http://localhost:3000/blogs`, {
      credentials: 'include',
    });
    const data = await res.json();
    return data;
  }

  useEffect(
    function () {
      async function getBlogs() {
        const data = await fetchBlogs();
        setBlogs(data);
      }
      getBlogs();
    },
    [setBlogs],
  );

  return (
    <div className="mx-auto grid w-full max-w-6xl px-6">
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-10 py-32">
          <h1 className="text-center text-xl font-bold">
            No thoughts have been added yet. <br />
            Let's write a new one now 💭
          </h1>
          <Link
            to="/add"
            className="w-full rounded-md bg-cyan-700 px-6 py-4 text-center text-white sm:max-w-sm"
          >
            Create your first thought
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
