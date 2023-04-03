import express from 'express';
import loginSbsController from '../../controllers/loginSbsController.js';
import authorize from '../../middleware/authorize.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);

router
    .post("/",loginSbsController.getLogin)

export default router;