import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    new winston.transports.Console(),
  ],
});

const errorHandler = (err, req, res, next) => {
  console.log("mid", err.is_success)
  const statusCode = err.statusCode || 500;
  const is_success = err.is_success;
  const message = err.message || 'Hubo un error en el servidor';

  // Registra el error en el logger de Winston
  logger.error({
    timestamp: new Date().toISOString(),
    url: req.originalUrl,
    method: req.method,
    file: err.fileName || null,
    code: statusCode,
    message: message,
    is_success: is_success,
    stack: err.stack
  });
  

  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: message,
      is_success: is_success
    },
  });
};


export default errorHandler;
