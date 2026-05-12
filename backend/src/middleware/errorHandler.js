function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message || 'Error interno del servidor';
  console.error(`[${status}] ${message}`, err.stack);
  res.status(status).json({ message });
}

module.exports = errorHandler;
