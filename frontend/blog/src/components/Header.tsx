import { GoHome } from 'react-icons/go';
import { MdLanguage } from 'react-icons/md';

import { Link, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type HeaderProps = {
  onSave: () => Promise<void>;
  blog: { id: string; userId: string } | null;
  onEdit: () => Promise<void>;
};

const Header: React.FC<HeaderProps> = ({ onSave, blog, onEdit }) => {
  const { id } = useParams();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { user } = useAuth();
  const location = useLocation();
  const isAddPage = location.pathname === '/add';
  const isDetailPage = location.pathname === `/blogs/${id}`;
  const isEditPage = location.pathname === `/blogs/edit/${id}`;

  const canEdit = blog?.userId === user?.userId;

  async function handleLogout() {
    try {
      await fetch(`http://localhost:3000/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setIsLoggedIn(false);
    } catch (err) {
      console.error(`Logout failed:`, err);
    }
  }

  return (
    <header className="fixed top-0 w-full">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white bg-opacity-70 px-3 py-3">
        <Link to={isLoggedIn ? '/blogs' : '/'} className="flex content-center">
          <GoHome size={24} className="text-cyan-700" />
        </Link>

        {!isLoggedIn && (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="rounded-md border border-solid border-cyan-700 bg-white px-6 py-2 text-sm text-cyan-700"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="rounded-md bg-cyan-700 px-6 py-2 text-sm text-white"
            >
              Sign Up
            </Link>
          </div>
        )}

        {isLoggedIn && !isDetailPage && !isEditPage && !isAddPage && (
          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-md px-6 py-2 text-sm text-cyan-700"
              onClick={handleLogout}
            >
              Log out
            </Link>
            <Link
              to={`/add`}
              className="rounded-md bg-cyan-700 px-6 py-2 text-sm text-white"
            >
              Add
            </Link>
          </div>
        )}

        {isLoggedIn && isDetailPage && (
          <div className="flex gap-2">
            <Link
              to="/"
              className="rounded-md px-6 py-2 text-sm text-cyan-700"
              onClick={handleLogout}
            >
              Log out
            </Link>
            {canEdit && (
              <Link
                to={`/blogs/edit/${id}`}
                className="rounded-md border border-solid border-cyan-700 bg-white px-6 py-2 text-sm text-cyan-700"
              >
                Edit
              </Link>
            )}
            <Link
              to={`/add`}
              className="rounded-md bg-cyan-700 px-6 py-2 text-sm text-white"
            >
              Add
            </Link>
          </div>
        )}

        {isLoggedIn && (isAddPage || isEditPage) && (
          <div className="flex gap-1">
            <div className="flex items-center gap-2 px-6 py-2">
              <MdLanguage size={14} className="text-cyan-700" />
              <p className="text-sm font-bold text-cyan-700">Public</p>
            </div>
            <p
              className="rounded-md bg-cyan-700 px-6 py-2 text-sm text-white"
              onClick={isEditPage ? onEdit : onSave}
            >
              Save
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
