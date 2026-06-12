import apiClient from './apiClient';
import type { Product, PaginatedResponse } from '../types';
import type { FilterState } from '../types';

export const productService = {
  getAll: (filters: Partial<FilterState> = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.set('category', String(filters.category));
    if (filters.search) params.set('search', filters.search);
    if (filters.minPrice) params.set('min_price', String(filters.minPrice));
    if (filters.maxPrice) params.set('max_price', String(filters.maxPrice));
    if (filters.sort) params.set('ordering', filters.sort);
    if (filters.page) params.set('page', String(filters.page));
    return apiClient.get<PaginatedResponse<Product>>(`/products/?${params}`).then((r) => r.data);
  },

  getById: (id: number) =>
    apiClient.get<Product>(`/products/${id}/`).then((r) => r.data),

  create: (data: FormData) =>
    apiClient.post<Product>('/products/', data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),

  update: (id: number, data: FormData) =>
    apiClient.patch<Product>(`/products/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } }).then((r) => r.data),

  delete: (id: number) =>
    apiClient.delete(`/products/${id}/`),
};
