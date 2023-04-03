import express from 'express';
import laraigoController from '../../controllers/laraigoController.js';

const router = express.Router();

router
    .post("/",laraigoController.sendValues)

export default router;