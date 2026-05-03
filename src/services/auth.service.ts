import api from "../config/api";
import type { AuthResponse, TokenRefreshResponse, RegisterData, LoginData } from "../types";

export class AuthService {
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/register", data);
    return response.data;
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/login", data);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<TokenRefreshResponse> {
    const response = await api.post<TokenRefreshResponse>("/refresh-token", { refreshToken });
    return response.data;
  }

  async logout(userId: string): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>("/logout", { userId });
    return response.data;
  }
}
