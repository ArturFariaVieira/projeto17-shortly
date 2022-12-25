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

export async function geturlbyId (req, res){
    const {id} = req.params;
    try{
        const url = await connection.query(`SELECT links.id, links."shortUrl", url FROM links WHERE id = $1`, [id]);
        if(url.rows.length < 1){
            return res.sendStatus(404);
        }
        return res.send(url.rows[0]);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};

export async function openurl (req, res){
    const {shortUrl} = req.params;
    try{
        const url = await connection.query(`SELECT * FROM links WHERE "shortUrl" = $1`, [shortUrl]);
        if(url.rows.length < 1){
            return res.sendStatus(404);
        }
        const visit = await connection.query(`UPDATE links SET "visitCount" = links."visitCount" +1 WHERE id = $1;`, [url.rows[0].id])
        res.status(301).redirect(url.rows[0].url);
        
    }catch (err){
        console.log(err);
        res.sendStatus(500);
    }

}

export async function deleteUrl(req, res){
    const {id} = req.params;
    const user = res.locals.user;
    console.log(user)

    try{
        const url = await connection.query(`SELECT * FROM links WHERE id = $1`, [id]);
        if(url.rows.length < 1 ){
            return res.sendStatus(404);
        }
        if(url.rows[0].userId != user.id){
            console.log(url.rows[0].userId)
            return res.sendStatus(401);
        }
        await connection.query(`DELETE FROM links WHERE id = $1`, [id])
        res.sendStatus(204);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}




