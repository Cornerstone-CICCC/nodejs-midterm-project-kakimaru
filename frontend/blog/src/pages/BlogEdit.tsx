import { useOutletContext } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useEffect, useRef } from 'react';
import { useBlog } from '../context/BlogContext';

export default function BlogEdit() {
  const { blog } = useBlog();
  const { newBlogData, setNewBlogData } = useOutletContext<{
    newBlogData: Blog;
    setNewBlogData: React.Dispatch<React.SetStateAction<Blog>>;
  }>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isLoading = !blog;

  useEffect(
    function () {
      if (blog) {
        setNewBlogData({
          id: blog.id,
          title: blog.title,
          content: blog.content,
          published: blog.published,
          userId: blog.userId,
        });
      }
    },
    [blog, setNewBlogData],
  );

  useEffect(function () {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewBlogData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey === false && e.shiftKey === false) {
      e.preventDefault();
    }
  };

  return (
    <form method="PUT" className="gap mx-auto grid w-full max-w-5xl gap-4 px-6">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 text-xl focus:border-transparent focus:outline-none"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={isLoading ? '' : newBlogData.title}
        />
      </div>
      <div>
        <textarea
          ref={textareaRef}
          name="content"
          id="content"
          placeholder="Enter your thoughts"
          className="w-full resize-none p-2 focus:border-transparent focus:outline-none"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={isLoading ? '' : newBlogData.content}
          onInput={handleInput}
        ></textarea>
      </div>
    </form>
  );
}
