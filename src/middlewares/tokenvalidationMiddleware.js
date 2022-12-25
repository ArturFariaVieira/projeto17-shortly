import connection from "../database.js";


export async function tokenValidationMiddleware(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')
    if (!token) {
        return res.sendStatus(401) 
       }
    try {
        const session = await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        if (session.rows.length < 1 ) {
            return res.send("1").status(401)
        }
        const expired = (Date.now() - session.rows[0].createdAt + 9000000 > 0);
        if(expired){
           return res.sendStatus(401);
        }
        const user = await connection.query(`SELECT * FROM users WHERE id = $1`, [session.rows[0].userId])
        if (user.rows.length < 1) {
            return res.sendStatus(401)        }

        res.locals.user = user.rows[0];

    } catch (err) {
        console.log(err)
        return res.sendStatus(500)  
      }
    next();
}