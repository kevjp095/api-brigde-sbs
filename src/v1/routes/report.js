import express from 'express';
import reportController from '../../controllers/reportController.js';
import authorize from '../../middleware/authorize.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);

router
    .post("/deuda",reportController.getDebtReport)
    .post("/afiliacion",reportController.getMembershipReport)

export default router;