import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController.js';
import schemasValidationMiddleware from '../middlewares/schemasMiddleware.js';

const authRouter = Router()
authRouter.use(schemasValidationMiddleware)
authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);

export default authRouter;

