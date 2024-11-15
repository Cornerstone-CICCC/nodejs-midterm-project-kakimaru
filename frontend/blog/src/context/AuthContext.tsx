import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  user: { userId: string } | null;
  setUser: (user: { userId: string }) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: null,
  setUser: () => {},
});

const checkLogin = async (): Promise<{
  loggedIn: boolean;
  userId?: string;
}> => {
  try {
    const res = await fetch(`http://localhost:3000/users/check-login`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) return { loggedIn: false };
    const data = await res.json();
    return { loggedIn: data.loggedIn, userId: data.userId };
  } catch (err) {
    console.error(err);
    return { loggedIn: false };
  }
};

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ userId: string } | null>(null);

  useEffect(() => {
    async function getLoginStatus() {
      const { loggedIn, userId } = await checkLogin();
      setIsLoggedIn(loggedIn);
      if (loggedIn && userId) {
        setUser({ userId });
      } else {
        setUser(null);
      }
    }
    getLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      setIsLoggedIn, 
      user, 
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(`AuthContext was used outside AuthProvider`);
  return context;
}

export { AuthProvider, useAuth };
