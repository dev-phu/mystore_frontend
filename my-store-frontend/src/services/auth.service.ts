import apiClient from "./apiClient";
import type { LoginPayload, RegisterPayload, AuthTokens, User } from "../types";

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthTokens>("/login/", payload).then((r) => r.data),

  register: (payload: RegisterPayload) =>
    apiClient.post<User>("/register/", payload).then((r) => r.data),

  refreshToken: (refresh: string) =>
    apiClient
      .post<{ access: string }>("/token/refresh/", { refresh })
      .then((r) => r.data),

  getProfile: () => apiClient.get<User>("/profile/").then((r) => r.data),

  updateProfile: (payload: Partial<User>) =>
    apiClient.put<User>("/profile/", payload).then((r) => r.data),
};
