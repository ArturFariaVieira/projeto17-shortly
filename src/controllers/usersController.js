import  connection  from '../database.js';
import { getMylinks } from '../repository/linksRepository.js';

export async function getMe(req, res){
    const {id, name} = res.locals.user;

    try{
        const urls = await getMylinks(id);
        let visits = 0;
        urls.rows.map((row) => {
        visits+= Number(row.visitCount);
        }
        )
        const resp = {
            id,
            name,
            visitCount: visits,
            shortnedUrls: urls.rows        
            }
            res.send(resp).status(200);
        } catch(err){
            console.log(err);
            res.sendStatus(500)
        }
    }

