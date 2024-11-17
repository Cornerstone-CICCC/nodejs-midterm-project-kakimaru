import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode, useEffect } from 'react';

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  useEffect(
    function () {
      if (!isLoggedIn) <Navigate to="/" />;
    },
    [isLoggedIn],
  );

  if (isLoggedIn) return children;
};

export default PrivateRoute;
