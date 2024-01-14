import express from "express"
import { login, register } from "../controllers/auth.controller.js"
import {body} from "express-validator"
import { validationResultExpress } from "../middlewares/validationResultExpress.js"

const router = express.Router()

router.get('/register', 
    [
        body('email', 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', "minimo 6 caracteres")
            .trim()
            .isLength({min:6}),
        body('password', 'Formato de password incorrecto')

            .custom((value, {req})=>{
                if (value !== req.body.repassword){
                    throw new Error("Las contraseñas no coinciden")
                }

                return value;

            })
    ],
    validationResultExpress,
    register
);
router.post('/login',
    [
        body('email', 'Formato de email incorrecto')
            .trim()
            .isEmail()
            .normalizeEmail(),
        body('password', "minimo 6 caracteres")
            .trim()
            .isLength({min:6}),
    ],
    validationResultExpress,
    login
);

export default router;