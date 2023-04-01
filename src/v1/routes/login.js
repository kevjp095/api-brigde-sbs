import express from 'express';
import loginSbsController from '../../controllers/loginSbsController.js';
import authorize from '../../middleware/authorize.js';
import errorHandler from '../../middleware/errorHandler.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);
router.use(errorHandler);

router
    .post("/sbs",loginSbsController.getLoginSbs)

export default router;