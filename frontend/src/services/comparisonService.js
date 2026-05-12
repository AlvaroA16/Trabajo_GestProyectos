import api from './api';

export const getCurriculum = (careerId, universityId) =>
  api.get(`/careers/${careerId}/curriculum/${universityId}`);
export const compareUniversities = (careerId, universityIds) =>
  api.get(`/careers/${careerId}/compare`, { params: { universities: universityIds.join(',') } });
