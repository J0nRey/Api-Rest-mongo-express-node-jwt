// importamos cookieParser
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import './database/connectdb.js';
import express from 'express';
import authRouter from './routers/auth.route.js'
import linkRoutes from './routers/link.route.js'

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRoutes)

// solo para el ejemplo
app.use(express.static('public')) // form

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Servidor activo http://localhost: " + PORT));