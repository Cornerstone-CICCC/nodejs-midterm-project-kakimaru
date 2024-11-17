import {
  createContext,
  ReactNode,
  useContext,
  // useEffect,
  useState,
} from 'react';
import { Blog } from '../types/blog';
// import { useParams } from 'react-router-dom';

interface BlogContextType {
  blog: Blog | null;
  setBlog: (blog: Blog | null) => void;
}

interface BlogProviderProps {
  // id: string;
  children: ReactNode;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const BlogProvider = ({ children }: BlogProviderProps): JSX.Element => {
  const [blog, setBlog] = useState<Blog | null>(null);
  // const { id } = useParams();

  // useEffect(
  //   function () {
  //     if (!id) return;

  //     async function fetchBlog(): Promise<void> {
  //       try {
  //         const res = await fetch(`http://localhost:3000/blogs/${id}`, {
  //           credentials: 'include',
  //         });
  //         if (!res.ok) throw new Error(`Failed to fetch blog data.`);
  //         const data = await res.json();
  //         setBlog(data);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }

  //     fetchBlog();
  //   },
  //   [id],
  // );

  return (
    <BlogContext.Provider value={{ blog, setBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

function useBlog(): BlogContextType {
  const context = useContext(BlogContext);
  if (context === undefined)
    throw new Error(`AuthContext was used outside AuthProvider`);
  return context;
}

export { BlogProvider, useBlog };
