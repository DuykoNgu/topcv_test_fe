import { useCallback } from "react";
import { AuthService } from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";

const authService = new AuthService();

export function useAuth() {
  const context = useAuthContext();
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  const { user, setUser, isLoading } = context;

  const login = useCallback(async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    const { user: loggedInUser, token, refreshToken } = response.data;

    localStorage.setItem("accessToken", token);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return response.data;
  }, [setUser]);

  const register = useCallback(async (username: string, email: string, password: string, confirmPassword: string) => {
    const response = await authService.register({ username, email, password, confirmPassword });
    const { user: registeredUser, token, refreshToken } = response.data;

    localStorage.setItem("accessToken", token);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(registeredUser));
    setUser(registeredUser);

    return response.data;
  }, [setUser]);

  const logout = useCallback(async () => {
    try {
      if (user?.id) {
        await authService.logout(user.id);
      }
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, [user?.id, setUser]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
}
