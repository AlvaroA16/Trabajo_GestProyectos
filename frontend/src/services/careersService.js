import careersData from '../data/careers.json';

// TODO: cuando el backend esté listo, reemplazar estas funciones por llamadas axios:
//   import api from './api';
//   export const getCareers = (params) => api.get('/careers', { params });

export const getCareers = ({ field, search } = {}) => {
  let results = [...careersData];
  if (field) results = results.filter((c) => c.field === field);
  if (search) {
    const q = search.toLowerCase();
    results = results.filter((c) => c.name.toLowerCase().includes(q) || c.field.toLowerCase().includes(q));
  }
  return Promise.resolve({ careers: results });
};

export const getCareerById = (id) => {
  const career = careersData.find((c) => c.id === Number(id)) || null;
  return Promise.resolve({ career });
};

export const getCareerFields = () => {
  const fields = [...new Set(careersData.map((c) => c.field))].sort();
  return Promise.resolve({ fields });
};
