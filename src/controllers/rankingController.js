import  connection  from '../database.js';

export async function getRanking(req,res){
    try{
        const rank = await connection.query(`SELECT users.id, users.name, COUNT(links."userId") AS "linksCount", SUM(links."visitCount") AS "visitCount" from users LEFT JOIN links ON users.id = links."userId" WHERE links."userId" = users.id GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10;
        `)
        res.send(rank.rows);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}