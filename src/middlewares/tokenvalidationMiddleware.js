import connection from "../database.js";
import {findSession} from "../repository/sesssionsRepository.js"
import { getUserById } from "../repository/usersRepository.js";


export async function tokenValidationMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')
    if (!token) {
        return res.sendStatus(401) 
       }
    try {
        const session = await findSession(token);
        if (session.rows.length < 1 ) {
            return res.sendStatus(401)
        }
        const expired = (Date.now() - session.rows[0].createdAt + 9000000 > 0);
        if(expired){
           return res.status(401).send("Token expirado, refaça login");
        }
        const user = await getUserById(session)
        if (user.rows.length < 1) {
            return res.sendStatus(401)        }

        res.locals.user = user.rows[0];

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)  
      }
    next();
}