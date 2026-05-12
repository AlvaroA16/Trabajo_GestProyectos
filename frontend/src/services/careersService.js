import api from './api';

export const getCareers = (params) => api.get('/careers', { params });
export const getCareerById = (id) => api.get(`/careers/${id}`);
export const getCareerFields = () => api.get('/careers/fields');
