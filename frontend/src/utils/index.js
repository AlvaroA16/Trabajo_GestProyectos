export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'long', year: 'numeric' });
};

export const formatTime = (timeStr) => {
  return timeStr?.slice(0, 5) || '';
};

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

export const slugify = (str) =>
  str.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export const truncate = (str, maxLength = 120) =>
  str && str.length > maxLength ? `${str.slice(0, maxLength)}...` : str;

export const getSurveyResultLabel = (score) => {
  if (score >= 80) return 'Muy compatible';
  if (score >= 60) return 'Compatible';
  if (score >= 40) return 'Moderadamente compatible';
  return 'Poco compatible';
};
