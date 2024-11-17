import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useBlog } from '../context/BlogContext';

export default function BlogDetail() {
  const { id } = useParams();
  const { blog, setBlog } = useBlog();

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
    [id, setBlog],
  );

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gap mx-auto grid w-full max-w-5xl gap-4 px-6">
      <div className="grid gap-4">
        <h1 className="p-2 text-xl font-bold text-slate-700">{blog.title}</h1>
        <p className="whitespace-pre-wrap p-2 text-sm leading-normal text-slate-700">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
