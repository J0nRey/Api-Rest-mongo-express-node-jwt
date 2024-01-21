import jwt from "jsonwebtoken"

export const generateToken = (uid) => {
    
    const expiresIn = 60 * 15

    try {
        const token = jwt.sign({uid}, process.env.JWT_SECRET, { expiresIn })
        return {token, expiresIn}
    } catch (error) {
        console.log(error)
    }
};


export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30

    try {
        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000) // en mil porque esta en mi
        })
    } catch (error) {
        console.log(error)
    }

}


export const errorsValidateToken = (error) => {
    switch (error) {
        case "invalid signature":
            return "firma no valida"
        case "jtw expired":
            return "token expirado"
        case "invalid token":
            return "no invente token"    
        default:
            return error;
    }
};