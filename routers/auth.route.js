import { 
        infoUser, 
        login, 
        register, 
        refreshToken, 
        logout 
    } from "../controllers/auth.controller.js";
import { Router } from "express";
import { body } from "express-validator";
import { requireToken } from "../middlewares/requireToken.js"
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = Router()

router.post('/register', 
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


// ruta protegida
router.get('/protected', requireToken, infoUser)

router.get('/refresh', refreshToken)

router.get('/logout', logout)

export default router;