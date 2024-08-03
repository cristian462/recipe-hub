import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/user.route.js';

const app = express();

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({extended: true, limit: '10mb'}))

app.use('/api/users', userRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>console.log('Servidor en '+ PORT));