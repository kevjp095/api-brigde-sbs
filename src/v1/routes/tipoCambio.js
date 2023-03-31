import express from 'express';
import tipoCambioController from '../../controllers/tipoCambioController.js';

const router = express.Router();

router
    .post("/",tipoCambioController.getExchangeRate)
    .post("/ultimo",tipoCambioController.getLatestExchangeRate);

export default router;