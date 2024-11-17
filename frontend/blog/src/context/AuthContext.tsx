import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  user: { userId: string } | null;
  checkLoginStatus: () => Promise<void>;
  login: (formData: {username: string, password: string}) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  user: null,
  checkLoginStatus: async () => {
    console.log("checkLoginStatus called in default context");
  },
  login: async (formData: { username: string; password: string }) => {
    console.log(formData);
  },
  logout: async () => {
    console.log("logout called in default context");
  },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ userId: string } | null>(null);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/check-login`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();

      if (!res.ok) {
        setIsLoggedIn(false);
        setUser(null);
        return
      }

      if(data.loggedIn && data.userId) {
        setIsLoggedIn(true)
        setUser({userId: data.userId})
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  const login = async (formData: {username: string, password: string}) => {
    try {
      const res = await fetch(`http://localhost:3000/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if(!res.ok) {
        throw new Error('Login failed');
      }

      setIsLoggedIn(true)
      setUser({ userId: data.userId })
    } catch(err) {
      console.error(err)
    }
  }

  const logout = async () => {
    try {
      const res = await fetch(`http://localhost:3000/users/logout`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Logout failed');
      }

      setIsLoggedIn(false);
      setUser(null);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        checkLoginStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error(`AuthContext was used outside AuthProvider`);
  return context;
}

export { AuthProvider, useAuth };
