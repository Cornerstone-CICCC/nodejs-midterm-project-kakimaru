import { useParams } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useEffect, useState } from 'react';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);

  
  useEffect(function(){
    async function fetchBlog(): Promise<void> {
      const res = await fetch(`http://localhost:3000/blogs/${id}`, {
        credentials: 'include',
      });
      const data = await res.json()
      setBlog(data)
    }

    if(id) {
      fetchBlog()
    }
  }, [id])

  if(!blog) {
    return <div>Loading...</div>
  }

  return (
    <div className='px-6 py-20'>
      <div className="grid gap-4">
        <h1 className="text-xl font-bold text-slate-700">{blog.title}</h1>
        <p className="text-sm leading-normal text-slate-700">
          {blog.content}
        </p>
      </div>
    </div>
  );
}
