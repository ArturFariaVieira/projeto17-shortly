import { Router } from 'express';
import { tokenValidationMiddleware } from '../middlewares/tokenvalidationMiddleware.js';
import {getMe} from "../controllers/usersController.js"
const usersRouter = Router()
usersRouter.use(tokenValidationMiddleware);
usersRouter.get("/users/me", getMe );


export default usersRouter;
