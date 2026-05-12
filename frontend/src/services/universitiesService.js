import api from './api';

export const getUniversities = (params) => api.get('/universities', { params });
export const getUniversityById = (id) => api.get(`/universities/${id}`);
export const getUniversitiesByCareer = (careerId) =>
  api.get(`/universities/by-career/${careerId}`);
