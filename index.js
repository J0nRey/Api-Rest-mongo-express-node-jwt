import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routers/auth.route.js'

// importamos cookieParser
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
// abilitamos cookieParser
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)

// solo para el ejemplo
app.use(express.static('public')) // form

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Servidor activo http://localhost:" + PORT));