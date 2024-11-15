import { useOutletContext } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useEffect } from 'react';

type BlogData = Omit<Blog, 'userId'>;

export default function AddBlog() {
  const { blogData, setBlogData } = useOutletContext<{
    blogData: BlogData;
    setBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
  }>();

  useEffect(
    function () {
      setBlogData({
        id: '',
        title: '',
        content: '',
        published: false,
      });
    },
    [setBlogData],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form method="POST" className="gap gap-4 py-16">
      <div className="p-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="text-xl"
          onChange={handleChange}
          value={blogData.title}
        />
      </div>
      <div className="p-4">
        <textarea
          name="content"
          id="content"
          placeholder="Enter your thoughts"
          onChange={handleChange}
          value={blogData.content}
        ></textarea>
      </div>
    </form>
  );
}
