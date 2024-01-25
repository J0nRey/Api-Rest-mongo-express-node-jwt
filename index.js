import 'dotenv/config';
import './database/connectdb.js';

// importamos cookieParser
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors'

import authRouter from './routers/auth.route.js'
import linkRoutes from './routers/link.route.js'
import redirectRouter from './routers/redirect.route.js'

const app = express()

const whiteList = [ process.env.ORIGIN1, process.env.ORIGIN2 ]

/* app.use(
    cors({
        origin: [ process.env.ORIGIN0 ],
    })
) */

app.use(
    cors({
        origin: function(origin, callback){
            if(whiteList.includes(origin)){
                return callback(null, origin)
            }
            return callback(
                "error de CORS origin: " + origin + " No autorizado!"
            )
        }
    })
)

app.use(express.json())
app.use(cookieParser())

// Ejemplo Back Redirect (Opcional)
app.use('/', redirectRouter)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/links', linkRoutes)

// solo para el ejemplo
//app.use(express.static('public')) // form

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Servidor activo http://localhost: " + PORT));