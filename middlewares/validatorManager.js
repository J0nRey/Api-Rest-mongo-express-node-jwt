import { validationResult, body, param } from "express-validator";
import axios from 'axios'

export const validationResultExpress = (req, res, next)=>{
    
    const errors = validationResult(req);
        
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    next()

}



export const paramLinkValidator = [
    param("id", "formato no valido (expressValidator)")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress
]


export const bodyLinkValidator = [
    body('longLink', 'Formato Link Incorrecto')
    .trim()
    .notEmpty()
    .custom(async value=>{
        
        try {
            if(!value.startsWith('https://')){
                value = 'https://' + value
            }

            console.log(value)

            await axios.get(value)
            return value
        } catch (error) {
            //console.log(error)
            throw new Error("Not found longLink 404")
        }
    })
    ,
    validationResultExpress
]


export const bodyRegisterValidator = [
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

        }
    ),
    validationResultExpress,
];

export const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto')
        .trim()
        .isEmail()
        .normalizeEmail(),
    body('password', "minimo 6 caracteres")
        .trim()
        .isLength({min:6}),
        validationResultExpress,
]
