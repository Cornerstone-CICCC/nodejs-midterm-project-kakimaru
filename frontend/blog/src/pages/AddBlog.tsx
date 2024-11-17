import { useOutletContext } from 'react-router-dom';
import { Blog } from '../types/blog';
import { useEffect, useRef } from 'react';

type BlogData = Omit<Blog, 'userId'>;

export default function AddBlog() {
  const { newBlogData, setNewBlogData } = useOutletContext<{
    newBlogData: BlogData;
    setNewBlogData: React.Dispatch<React.SetStateAction<BlogData>>;
  }>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(
    function () {
      setNewBlogData({
        id: '',
        title: '',
        content: '',
        published: false,
      });
    },
    [setNewBlogData],
  );

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
    <form
      method="POST"
      className="gap mx-auto grid w-full max-w-5xl gap-4 px-6"
    >
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="text-xl w-full p-2 focus:outline-none focus:border-transparent"
          onChange={handleChange}
          value={newBlogData.title}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        <textarea
          ref={textareaRef}
          name="content"
          id="content"
          placeholder="Enter your thoughts"
          className='w-full p-2 focus:outline-none focus:border-transparent resize-none'
          onChange={handleChange}
          value={newBlogData.content}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>
    </form>
  );
}
