import apiClient from './apiClient';
import type { Order, PaginatedResponse } from '../types';

export const orderService = {
  getMyOrders: (page = 1) =>
    apiClient.get<PaginatedResponse<Order>>(`/orders/?page=${page}`).then((r) => r.data),

  getById: (id: number) =>
    apiClient.get<Order>(`/orders/${id}/`).then((r) => r.data),

  create: (payload: { items: { product: number; quantity: number }[]; shippingAddress: object }) =>
    apiClient.post<Order>('/orders/', payload).then((r) => r.data),

  cancel: (id: number) =>
    apiClient.post<Order>(`/orders/${id}/cancel/`).then((r) => r.data),

  // Admin only
  getAllOrders: (page = 1) =>
    apiClient.get<PaginatedResponse<Order>>(`/admin/orders/?page=${page}`).then((r) => r.data),

  updateStatus: (id: number, status: string) =>
    apiClient.patch<Order>(`/admin/orders/${id}/`, { status }).then((r) => r.data),
};
