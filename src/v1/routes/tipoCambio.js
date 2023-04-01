import express from 'express';
import tipoCambioController from '../../controllers/tipoCambioController.js';
import authorize from '../../middleware/authorize.js';
import errorHandler from '../../middleware/errorHandler.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);
router.use(errorHandler);

router
    .post("/",tipoCambioController.getExchangeRate)
    .post("/ultimo",tipoCambioController.getLatestExchangeRate);

export default router;