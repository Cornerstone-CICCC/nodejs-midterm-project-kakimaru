import { Outlet, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { Blog } from '../types/blog';

export default function AppLayout() {
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    published: false,
  });
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(
    function () {
      async function fetchBlog(): Promise<void> {
        const res = await fetch(`http://localhost:3000/blogs/${id}`, {
          credentials: 'include',
        });
        const data = await res.json();
        setBlog(data);
      }

      if (id) {
        fetchBlog();
      }
    },
    [id],
  );

  async function handleSave() {
    try {
      const res = await fetch(`http://localhost:3000/blogs/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: blogData.title,
          content: blogData.content,
          published: blogData.published,
        }),
      });
      const data = await res.json();
      console.log(`Saved blog`, data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      if (!id || !blogData) return;

      const res = await fetch(`http://localhost:3000/blogs/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: blogData.title,
          content: blogData.content,
          published: blogData.published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(`Failed to update blog`, data);
      } else {
        const updatedBlog = await res.json();
        setBlog(updatedBlog);
        setBlogs((prev) =>
          prev.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
        );
      }
    } catch (err) {
      console.error(err);
    }
  }


  return (
    <div>
      <Header onSave={handleSave} blog={blog} onEdit={handleUpdate} />
      <main>
        <Outlet
          context={{
            blogData,
            setBlogData,
            blog,
            blogs,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
