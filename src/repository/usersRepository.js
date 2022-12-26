import connection from "../database.js";

export async function getUser(email){
   return await connection.query
    (
        `
        SELECT * 
        FROM users 
        where email = $1
        `, 
        [email]
    )
}

export async function insertUser(name, email, passwordHash){
   return await connection.query
    (
        `
        INSERT INTO 
        users 
        (name, email, password) 
        VALUES ($1, $2, $3); 
        `, 
        [name, email, passwordHash]
    )
}

export async function getUsersByRanking(){
   return await connection.query
    (
        `
        SELECT 
        users.id, users.name, 
        COUNT(links."userId") AS "linksCount", 
        SUM(links."visitCount") AS "visitCount" 
        FROM users 
        LEFT JOIN links 
        ON users.id = links."userId" 
        WHERE links."userId" = users.id 
        GROUP BY users.id 
        ORDER BY "visitCount" DESC 
        LIMIT 10
        ;`
    )
}

export async function getUserById(session){
    return await connection.query
    (
        `
        SELECT * 
        FROM users 
        WHERE id = $1
        `, 
        [session.rows[0].userId]
    )
}