import { Router } from 'express';
import { signIn, signUp } from '../controllers/authController';
import schemasValidationMiddleware from '../middlewares/schemasMiddleware';

const authRouter = Router()
authRouter.post("/signin", schemasValidationMiddleware, signIn);
authRouter.post("/signup",schemasValidationMiddleware, signUp);

export default authRouter;

