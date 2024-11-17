import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import BlogDetail from './pages/BlogDetail';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import SignUp from './pages/SignUp';
import Login from './pages/LogIn';
import AddBlog from './pages/AddBlog';
import { AuthProvider } from './context/AuthContext';
import PageNotFound from './pages/PageNotFound';
import BlogEdit from './pages/BlogEdit';
import PrivateRoute from './pages/PrivateRoute';
import { BlogProvider } from './context/BlogContext';
import { BlogsProvider } from './context/BlogsContext';

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
        element: (
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        ),
      },
      {
        path: '/add',
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: '/blogs/:id',
        element: (
          <PrivateRoute>
            <BlogDetail />
          </PrivateRoute>
        ),
      },
      {
        path: '/blogs/edit/:id',
        element: (
          <PrivateRoute>
            <BlogEdit />
          </PrivateRoute>
        ),
      },
      {
        path: '/404',
        element: <PageNotFound />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {

  return (
    <BlogsProvider>
      <BlogProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </BlogProvider>
    </BlogsProvider>
  );
}

export default App;
