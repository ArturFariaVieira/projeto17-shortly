import  connection  from '../database.js';
import { customAlphabet } from 'nanoid';
import { insertLink, findLinkById, findLinkByShort, updateLinkVisitCount, deleteUrlById } from '../repository/linksRepository.js';


export async function shortenUrl(req, res){
    const {url} = req.body;
    const nanoid = customAlphabet('AaBbCcDdEeFfGgHhIiJjKk123456789', 6);
    const shorturl = nanoid();
    const user = res.locals.user;

    try{
        
        const newurl = await insertLink (shorturl, url, user);
        res.status(201).send({shortUrl: shorturl});
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }


};

export async function geturlbyId (req, res){
    const {id} = req.params;
    try{
        const link = await findLinkById(id);
        console.log(link)
        if(link.rows.length<1){
            return res.sendStatus(404)
        }
        const {shortUrl, url} = link.rows[0]
        if(!id || !shortUrl){
            return res.sendStatus(404);
        }
        return res.status(200).send({id, shortUrl, url});
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
};

export async function openurl (req, res){
    const {shortUrl} = req.params;
    try{
        const link = await findLinkByShort(shortUrl)
        console.log(link.rows[0].url)
        if(link.rows.length < 1){
            return res.sendStatus(404);
        }
        const visit = await updateLinkVisitCount(link)

        res.status(301).redirect(link.rows[0].url);
        
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
        const url = await findLinkById(id)
        if(url.rows.length < 1 ){
            return res.sendStatus(404);
        }
        if(url.rows[0].userId != user.id){
            console.log(url.rows[0].userId)
            return res.sendStatus(401);
        }
        await deleteUrlById(id)
        res.sendStatus(204);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}




