import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api.users
      .me()
      .then((profile) => setUser(profile))
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const data = await api.auth.login(email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("refresh_token", data.refresh_token);
    setUser(data.user);
    return data.user;
  }

  async function signup(email, password, name) {
    await api.auth.signup(email, password, name);
    return login(email, password);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  }

  const value = { user, loading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
