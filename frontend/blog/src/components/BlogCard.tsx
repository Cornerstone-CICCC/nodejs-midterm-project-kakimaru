import { IoTrashOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useState } from 'react';

type BlogProps = {
  blog: Blog;
};

const BlogCard: React.FC<BlogProps> = ({ blog }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this blog?`)) {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/blogs/delete/${blog.id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        if (res.ok) {
          alert(`Blog deleted successfully!`);
          navigate('/blogs');
        } else {
          alert(`Failed to delete the blog.`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (isLoading)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );

  return (
    <Link to={`/blogs/${blog.id}`} className="flex flex-col gap-2">
      <div className="grid w-full gap-4 rounded-lg bg-slate-100 p-6">
        <h2 className="line-clamp-1 break-all text-lg font-bold text-slate-700">
          {blog.title}
        </h2>
        <p className="line-clamp-2 break-all text-sm text-slate-500">
          {blog.content}
        </p>
      </div>
      <button className="flex justify-end gap-2" onClick={handleDelete}>
        <IoTrashOutline size={14} className="text-red-500" />
        <p className="text-xs text-red-500">Delete</p>
      </button>
    </Link>
  );
};

export default BlogCard;
