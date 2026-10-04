import { createContext, useContext, useMemo, useState } from "react";
import { authService } from "../services/auth.service";

const AuthContext = createContext(null);
const safeParse = (value) => {
  try { return JSON.parse(value); } catch { return null; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => safeParse(localStorage.getItem("nexusbase_user")));
  const [loading, setLoading] = useState(false);

  const persistSession = (data) => {
    const token = data.token || data.accessToken;
    const account = data.user || data.data?.user;
    if (!token) throw new Error("The server response did not include an access token.");
    localStorage.setItem("nexusbase_token", token);
    localStorage.setItem("nexusbase_user", JSON.stringify(account || {}));
    setUser(account || {});
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      persistSession(data);
      return data;
    } finally { setLoading(false); }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      persistSession(data);
      return data;
    } finally { setLoading(false); }
  };

  const logout = async () => {
    try { await authService.logout(); } catch { /* Local logout remains available offline. */ }
    localStorage.removeItem("nexusbase_token");
    localStorage.removeItem("nexusbase_user");
    setUser(null);
  };

  const value = useMemo(() => ({
    user, loading, login, register, logout,
    isAuthenticated: Boolean(localStorage.getItem("nexusbase_token")),
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
