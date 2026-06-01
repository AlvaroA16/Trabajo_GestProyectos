require('dotenv').config();
const app = require('./src/config/app');
const pool = require('./src/config/database');

const PORT = process.env.PORT || 4000;

async function start() {
  await pool.query('SELECT 1');
  console.log('Conexión a PostgreSQL (Supabase) establecida');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

start().catch((err) => {
  console.error('Error al iniciar el servidor:', err.message);
  process.exit(1);
});
