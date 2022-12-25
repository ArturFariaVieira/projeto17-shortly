import  connection  from '../database.js';
import { customAlphabet } from 'nanoid';


export async function shortenUrl(req, res){
    const {url} = req.body;
    const nanoid = customAlphabet('AaBbCcDdEeFfGgHhIiJjKk123456789', 6);
    const shorturl = nanoid();
    const user = res.locals.user;

    try{
        
        const newurl = await connection.query(`INSERT INTO links ("shortUrl", url, "userId") VALUES ($1, $2, $3); `, [shorturl, url, user.id]);
        res.send({shortUrl: shorturl}).status(201);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }


};




