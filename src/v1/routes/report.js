import express from 'express';
import reportController from '../../controllers/reportController.js';
import authorize from '../../middleware/authorize.js';
import { validateDocument } from '../../middleware/validateBody.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);

router
    .post("/deuda",validateDocument,reportController.getDebtReport)
    .post("/afiliacion",validateDocument,reportController.getMembershipReport)

export default router;