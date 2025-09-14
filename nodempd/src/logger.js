const { createLogger, format, transports } = require('winston');

// Configuración del logger
const logger = createLogger({
  level: 'info', // Nivel mínimo que se registrará
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    // Consola (para mostrar en tiempo real)
    new transports.Console(),
    // Elimina el transporte Console
    new transports.File({ filename: '..\\volumen\\azu\\winston\\logs\\error.log', level: 'error' }),
    new transports.File({ filename: '..\\volumen\\azu\\winston\\logs\\combined.log' }),
  ],
});

module.exports = logger;
