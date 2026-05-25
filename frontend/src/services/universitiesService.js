import universitiesData from '../data/universities.json';

// TODO: cuando el backend esté listo, reemplazar estas funciones por llamadas axios:
//   import api from './api';
//   export const getUniversities = (params) => api.get('/universities', { params });

export const getUniversities = ({ type, region, search } = {}) => {
  let results = [...universitiesData];
  if (type)   results = results.filter((u) => u.type === type);
  if (region) results = results.filter((u) => u.location_region === region);
  if (search) {
    const q = search.toLowerCase();
    results = results.filter((u) =>
      u.name.toLowerCase().includes(q) || u.acronym.toLowerCase().includes(q)
    );
  }
  return Promise.resolve({ universities: results });
};

export const getUniversityById = (id) => {
  const university = universitiesData.find((u) => u.id === Number(id)) || null;
  return Promise.resolve({ university });
};

export const getUniversitiesByCareer = (careerId) => {
  // Por ahora devuelve todas; cuando haya BD filtrará por career_university
  return Promise.resolve({ universities: universitiesData });
};
