export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const CAREER_FIELDS = {
  CIENCIAS_SALUD: 'Ciencias de la Salud',
  INGENIERIA: 'Ingeniería y Tecnología',
  HUMANIDADES: 'Humanidades y Educación',
  CIENCIAS_SOCIALES: 'Ciencias Sociales',
  ECONOMICAS: 'Ciencias Económicas y Empresariales',
  DERECHO: 'Derecho y Ciencias Políticas',
  ARTE_DISEÑO: 'Arte y Diseño',
  CIENCIAS_BASICAS: 'Ciencias Básicas',
};

export const UNIVERSITY_TYPES = {
  PUBLICA: 'Pública',
  PRIVADA: 'Privada',
};

export const GRADES = {
  CUARTO: '4to de Secundaria',
  QUINTO: '5to de Secundaria',
};

export const WORKSHOP_STATUS = {
  UPCOMING: 'próximo',
  ONGOING: 'en_curso',
  COMPLETED: 'finalizado',
  CANCELLED: 'cancelado',
};

export const PERU_REGIONS = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca',
  'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín',
  'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios',
  'Moquegua', 'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna',
  'Tumbes', 'Ucayali',
];
