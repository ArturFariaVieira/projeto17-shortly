import connection from "../database.js";

export async function insertLink (shorturl, url, user){
   return await connection.query
    (
        `
        INSERT INTO 
        links 
        ("shortUrl", url, "userId") 
        VALUES ($1, $2, $3); 
        `,
        [shorturl, url, user.id]
    )
}

export async function findLinkById(id){
    return await connection.query
    (
        `SELECT * 
         FROM links 
         WHERE id = $1
         `,
         [id]
    )
}

export async function findLinkByShort(shortUrl){
    return await connection.query
    (
        `
        SELECT * 
        FROM links 
        WHERE "shortUrl" = $1
        `,
        [shortUrl]
    )
}

export async function updateLinkVisitCount(url){
    return await connection.query
    (
        `
        UPDATE links 
        SET "visitCount" = links."visitCount" +1 
        WHERE id = $1;
        `,
        [url.rows[0].id]
    )
}

export async function deleteUrlById(id){
   return await connection.query
    (
        `
        DELETE 
        FROM links 
        WHERE id = $1
        `,
        [id]
    );
}

export async function getMylinks(id){
   return await connection.query
    (
        `
        SELECT id, "shortUrl", url, "visitCount" 
        FROM links 
        WHERE links."userId" = $1 
        ORDER BY id
        `,
        [id]
    )
}