import connection from "../database.js";

export async function insertSession (id, token){
   return await connection.query
    (
        `
        INSERT INTO 
        sessions 
        ("userId", token)
        VALUES ($1, $2)
        `,
        [id, token]
    )
}

export async function findSession(token){
    return await connection.query
    (
        `
        SELECT * 
        FROM sessions 
        WHERE token = $1
        `, 
        [token]
    )
}