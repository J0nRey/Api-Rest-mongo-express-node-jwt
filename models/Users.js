import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please provide your email"],
        trim: true, // limpiar los datos a la derecha e izquierda.
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password:{
        type: String,
        require: [true, "Please provide a password"],
    }
});

userSchema.pre("save", async function (next) {
    const user = this;

    if(!user.isModified('password')) return next();

    try {
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.error(error)
        throw new Error('Fallo el hash de contraseña')
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password)
}

export const User = mongoose.model("User", userSchema);