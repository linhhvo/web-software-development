import postgres from 'postgres';
import {hash} from 'scrypt';

const sql = postgres();

export const add = async (userInfo) => {
    return await sql`INSERT INTO users (email, password_hash)
                     VALUES (${userInfo.email.trim().toLowerCase()}, ${hash(userInfo.password.trim())}) RETURNING *;`

}

export const getUser = async (userInfo) => {
    return await sql`SELECT *
                     FROM users
                     WHERE email = ${userInfo.email.trim().toLowerCase()}`
}

export const getId = async (userEmail) => {
    return await sql`SELECT id
                     FROM users
                     WHERE email = ${userEmail};
    `
}