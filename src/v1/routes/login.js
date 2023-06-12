import express from 'express';
import loginSbsController from '../../controllers/loginSbsController.js';
import authorize from '../../middleware/authorize.js';
import { validateLogin } from '../../middleware/validateBody.js';

const router = express.Router();

// Agregar middleware a todas las rutas
router.use(authorize);

router
    .post("/",validateLogin,loginSbsController.getLogin)
    .post("/close-tab",loginSbsController.closeTab)

export default router;