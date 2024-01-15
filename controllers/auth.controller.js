import { User } from '../models/Users.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res)=>{
    const {email, password} = req.body;
    try {
        // Alternativa buscando por email
        let user = await User.findOne({email})
        if(user) throw {code: 11000};

        user = new User({email, password})
        await user.save();

        // Generar el token jwt token

        return res.status(201).json({ok: true});
    } catch (error) {
        console.error(error)
        // Alternativa por defecto mongoose
        if(error.code === 11000){
            return res.status(400).json({error: 'Ya existe este usuario'})
        }
        return res.status(500).json({error: "Error de servidor"})
    }

    res.json({ok: 'Register'})
};

export const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        let user = await User.findOne({email})
        if(!user) 
            return res.status(400).json({error: 'No existe este usuario'});


        const respuestaPassword = await user.comparePassword(password)
        if(!respuestaPassword) 
            return res.status(400).json({error: 'contraseña incorrecta'});

            // Generar el token jwt token
            const token = jwt.sign({uid: user.id}, process.env.JWT_SECRET)



        return res.json({ token })
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Error de servidor"})
    }

};
