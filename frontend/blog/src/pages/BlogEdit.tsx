import { useOutletContext } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useEffect } from 'react';

type BlogData = Omit<Blog, 'userId'>;

export default function BlogEdit() {
  // const { id } = useParams<{ id: string }>();
  const { blogData, setBlogData, blog } = useOutletContext<{
    blogData: BlogData;
    setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
    blog: Blog | null;
  }>();
  const isLoading = !blog;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(function() {
    if(blog) {
      setBlogData({
        id: blog.id,
        title: blog.title,
        content: blog.content,
        published: blog.published,
      })
    }
  }, [blog, setBlogData])

  return (
    <form method="PUT" className="gap gap-4 py-16">
      <div className="p-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="text-xl"
          onChange={handleChange}
          value={isLoading ? '' : blogData.title}
        />
      </div>
      <div className="p-4">
        <textarea
          name="content"
          id="content"
          placeholder="Enter your thoughts"
          onChange={handleChange}
          value={isLoading ? '' : blogData.content}
        ></textarea>
      </div>
    </form>
  );
}
