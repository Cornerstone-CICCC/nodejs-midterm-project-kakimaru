// import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';
import PageNotFound from './PageNotFound';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // useEffect(
  //   function () {
  //     if (!isLoggedIn) (<Navigate to="/" />);
  //   },
  //   [isLoggedIn],
  // );

  if (isLoggedIn) return children;
  return <PageNotFound />
};

export default PrivateRoute;
