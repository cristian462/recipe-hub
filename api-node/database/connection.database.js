import 'dotenv/config'
import mysql from 'mysql2/promise';

export const db =await mysql.createConnection(
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME,
	}
);

db.connect((err) => {
    if (err) {
      throw new Error(`Error al conectar a la base de datos: ${err.message}`);
    }
    console.log('Base de datos conectada');
  });