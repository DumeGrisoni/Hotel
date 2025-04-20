import { createContext, useContext, useState, useEffect } from 'react';
import checkAuth from '../actions/checkAuth';
import { User } from '@/types/userType';

const AuthContext = createContext({
  isUserAuthenticated: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsUserAuthenticated: (isAuthenticated: boolean) => {},
  user: null as User | null,
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // -------------------- Hooks --------------------
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // -------------------- useEffect --------------------
  useEffect(() => {
    const fetchAuth = async () => {
      const { isAuthenticated, user } = await checkAuth();
      setIsUserAuthenticated(isAuthenticated);
      setUser(user as User);
    };
    fetchAuth();
  }, [isUserAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isUserAuthenticated, setIsUserAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth doit être utilisé à l'intérieur de AuthProvider");
  }
  return context;
};
