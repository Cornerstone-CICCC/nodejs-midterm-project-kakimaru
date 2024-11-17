import { Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBlog } from '../context/BlogContext';
import { useBlogs } from '../context/BlogsContext';

export default function AppLayout() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [newBlogData, setNewBlogData] = useState({
    title: '',
    content: '',
    published: false,
  });
  const { id } = useParams<{ id: string }>();
  const { blog, setBlog } = useBlog();
  const { blogs, setBlogs } = useBlogs();

  useEffect(
    function () {
      if (!isLoggedIn) return;

      async function fetchBlogs() {
        const res = await fetch(`http://localhost:3000/blogs`, {
          credentials: 'include',
        });
        const data = await res.json();
        setBlogs(data);
      }
      fetchBlogs();
    },
    [setBlogs, isLoggedIn],
  );

  useEffect(
    function () {
      if (!id) return;
      async function fetchBlog(): Promise<void> {
        try {
          const res = await fetch(`http://localhost:3000/blogs/${id}`, {
            credentials: 'include',
          });
          const data = await res.json();
          setBlog(data);
        } catch (err) {
          console.error(`Error fetching blog`, err);
        }
      }

      fetchBlog();
    },
    [id, setBlog],
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
          title: newBlogData.title,
          content: newBlogData.content,
          published: newBlogData.published,
        }),
      });
      const newBlog = await res.json();
      if (res.ok && newBlog.id) {
        setBlog(newBlog);
        setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
        navigate(`/blogs/${newBlog.id}`);
      } else if (!res.ok) {
        console.error(`Failed to add blog`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleUpdate() {
    try {
      if (!id || !newBlogData) return;

      const res = await fetch(`http://localhost:3000/blogs/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: newBlogData.title,
          content: newBlogData.content,
          published: newBlogData.published,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error(`Failed to update blog`, data);
      } else {
        const updatedBlog = await res.json();
        setBlog(updatedBlog);
        setBlogs(prevBlogs =>
          prevBlogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
        );
        navigate(`/blogs/${id}`)
      }
    } catch (err) {
      console.error(`Error updating blog`, err);
    }
  }

  return (
    <div>
      <Header onSave={handleSave} onEdit={handleUpdate} />
      <main className="py-20">
        <Outlet
          context={{
            newBlogData,
            setNewBlogData,
            blog,
            blogs,
            setBlogs,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}
