import express from 'express';
import exchangeRateController from '../../controllers/exchangeRateController.js';
import authorize from '../../middleware/authorize.js';
import { validateExchange } from '../../middleware/validateBody.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);

router
    .post("/",validateExchange,exchangeRateController.getExchangeRate)
    .post("/ultimo",exchangeRateController.getLatestExchangeRate);

export default router;