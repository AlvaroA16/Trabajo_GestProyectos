require('dotenv').config();
const app = require('./src/config/app');
const { getPool } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

async function start() {
  await getPool();
  console.log('Conexión a Azure SQL establecida');
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

start().catch((err) => {
  console.error('Error al iniciar el servidor:', err.message);
  process.exit(1);
});
