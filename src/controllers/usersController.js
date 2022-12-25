import  connection  from '../database.js';

export async function getMe(req, res){
    const {id, name} = res.locals.user;

    try{
        const urls = await connection.query(`SELECT id, "shortUrl", url, "visitCount" FROM links WHERE links."userId" = $1 ORDER BY id`, [id]);
        let visits = 0;
        const totalvisits = urls.rows.map((row) => {
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

