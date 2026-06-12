import apiClient from './apiClient';
import type { LoginPayload, RegisterPayload, AuthTokens, User } from '../types';

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<AuthTokens>('/auth/login/', payload).then((r) => r.data),

  register: (payload: RegisterPayload) =>
    apiClient.post<User>('/auth/register/', payload).then((r) => r.data),

  refreshToken: (refresh: string) =>
    apiClient.post<{ access: string }>('/auth/token/refresh/', { refresh }).then((r) => r.data),

  getProfile: () =>
    apiClient.get<User>('/auth/profile/').then((r) => r.data),
};
