import { Router } from 'express';
import { schemasValidationMiddleware } from '../middlewares/schemasMiddleware.js';
import { shortenUrl, geturlbyId, openurl, deleteUrl } from '../controllers/urlsController.js';
import { tokenValidationMiddleware } from '../middlewares/tokenvalidationMiddleware.js';

const urlsRouter = Router()
urlsRouter.post("/urls/shorten", schemasValidationMiddleware, tokenValidationMiddleware, shortenUrl);
urlsRouter.get("/urls/:id", geturlbyId);
urlsRouter.get("/urls/open/:shortUrl", openurl)
urlsRouter.delete("/urls/:id", tokenValidationMiddleware, deleteUrl)

export default urlsRouter;

