import api from './api';

export const getWorkshops = (params) => api.get('/workshops', { params });
export const getWorkshopById = (id) => api.get(`/workshops/${id}`);
export const registerForWorkshop = (workshopId, data) =>
  api.post(`/workshops/${workshopId}/register`, data);
