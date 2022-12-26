import { Router } from 'express';
import { tokenValidationMiddleware } from '../middlewares/tokenvalidationMiddleware.js';
import {getMe} from "../controllers/usersController.js"
const usersRouter = Router()
usersRouter.get("/users/me", tokenValidationMiddleware, getMe );


export default usersRouter;
