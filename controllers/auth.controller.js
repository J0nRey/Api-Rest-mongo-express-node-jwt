import { User } from '../models/Users.js';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

export const register = async (req, res)=>{
    const {email, password} = req.body;
    try {
        // Alternativa buscando por email
        let user = await User.findOne({email})
        if(user) throw {code: 11000};

        user = new User({email, password})
        await user.save();

        
        // Generar el token jwt token
        const { token, expiresIn } = generateToken(user.id);
        generateRefreshToken(user.id, res)


        return res.status(201).json({ token, expiresIn });
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

    console.log("Entro aqui===???")

    try {
        const { email, password } = req.body;

        let user = await User.findOne({email})
        if(!user) 
            return res.status(403).json({error: 'No existe este usuario'});


        const respuestaPassword = await user.comparePassword(password)
        if(!respuestaPassword) 
            return res.status(403).json({error: 'contraseña incorrecta'});



            // Generar el token jwt
            const {token, expiresIn} = generateToken(user.id);
            generateRefreshToken(user.id, res)




        return res.json({token, expiresIn})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Error de servidor"})
    }

};

export const infoUser = async(req, res)=>{

    try {
        
        const user = await User.findById(req.uid).lean()
        return res.json({ email: user.email, uid: user._id })

    } catch (error) {
        return res.status(500).json({error: "error de server"})
    }

    

}

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid)
        return res.json({ token, expiresIn })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "error de server"})
    }
}

export const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ok: true})
}