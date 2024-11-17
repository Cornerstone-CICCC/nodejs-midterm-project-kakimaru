import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ReactNode } from 'react';

const PrivateRoute: React.FC<{children: ReactNode}> = ({children}) => {
  const { isLoggedIn } = useAuth();


  if(!isLoggedIn) {
    return  <Navigate to='/404' />
  }

  return <>{children}</>;
}

export default PrivateRoute