import  connection  from '../database.js';
import { getUsersByRanking } from '../repository/usersRepository.js';

export async function getRanking(req,res){
    try{
        const rank = await getUsersByRanking();
        
        res.send(rank.rows);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}