import { db } from '../database/connection.database.js';

const create = async ({ nombre, email, pass, foto }) => {
    const [rows] = await db.query(`
        INSERT INTO user (nombre, email, pass, foto)
        VALUES (?, ?, ?, ?)
    `, [nombre, email, pass, foto]);

    return rows;
};

const findOneByEmail = async (email) => {
    const [rows] = await db.query(`
        SELECT nombre, email, foto,created_at FROM user
        WHERE email = ?
    `, [email]);

    return rows[0];
};

export const UserModel = {
    create,
    findOneByEmail
};
