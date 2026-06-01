const BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const post = async (path, body) => {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Error del servidor');
  return data;
};

export const registerUser = (payload) => post('/auth/register', payload);
export const loginUser = (payload) => post('/auth/login', payload);
