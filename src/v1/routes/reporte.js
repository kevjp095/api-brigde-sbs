import express from 'express';
import reporteController from '../../controllers/reporteController.js';
import authorize from '../../middleware/authorize.js';
import errorHandler from '../../middleware/errorHandler.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);
router.use(errorHandler);

router
    .post("/deuda",reporteController.getDebtReport)
    .post("/afiliacion",reporteController.getMembershipReport)

export default router;