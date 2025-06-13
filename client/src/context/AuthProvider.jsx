import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(() => {
    return localStorage.getItem("isLogin") === "true";
  });

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.log("failed to parse user form local storage");
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin.toString());
    localStorage.setItem("user", JSON.stringify(user));
  }, [user, isLogin]);

  const login = (userData) => {
    setIsLogin(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLogin(false);
    setUser(null);
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ login, isLogin, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
