import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Blog } from '../types/blog';
import { useAuth } from './AuthContext';

export interface BlogsContextType {
  blogs: Blog[];
  setBlogs: Dispatch<SetStateAction<Blog[]>>;
}

interface BlogsProviderProps {
  children: ReactNode;
}

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

const BlogsProvider = ({ children }: BlogsProviderProps): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(
    function () {
      if (!isLoggedIn) return;

      async function fetchBlogs() {
        const res = await fetch(`http://localhost:3000/blogs`, {
          credentials: 'include',
        });
        const allBlogData = await res.json();
        setBlogs(allBlogData);
      }
      fetchBlogs();
    },
    [isLoggedIn],
  );

  return (
    <BlogsContext.Provider value={{ blogs, setBlogs }}>
      {children}
    </BlogsContext.Provider>
  );
};

function useBlogs(): BlogsContextType {
  const context = useContext(BlogsContext);
  if (context === undefined)
    throw new Error(`AuthContext was used outside AuthProvider`);
  return context;
}

export {BlogsProvider, useBlogs}