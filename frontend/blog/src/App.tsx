import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import BlogDetail from './pages/BlogDetail';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import SignUp from './pages/SignUp';
import Login from './pages/LogIn';
import AddBlog from './pages/AddBlog';
import { AuthProvider } from './context/AuthContext';
import PageNotFound from './PageNotFound';
import BlogEdit from './pages/BlogEdit';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,

    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/add',
        element: <AddBlog />,
      },
      {
        path: '/blogs/:id',
        element: <BlogDetail />,
      },
      {
        path: '/blogs/edit/:id',
        element: <BlogEdit />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
