import jwt from 'jsonwebtoken' 

export const requireToken = (req, res, next) => {
    try {

        let token = req.headers?.authorization
        console.log(token)
        if(!token) throw new Error("No Bearer")
        
        token = token.split(" ")[1]

        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
      

        req.uid = uid

        next();
        
    } catch (error) {
        console.log(error);

        const tokenVerificationErrors = {
            "invalid signature": "La firma del jwt no es valida",
            "jwt expired": "JWT Expidado",
            "invalid token": "Token no valido",
            "No Bearer": "No Bearer, Utiliza formato Bearer",
            "jwt malformed": "JWT formato no valido"
        }

        return res
            .status(401)
            .json({error: tokenVerificationErrors[error.message]})
    }
}