import { Schema, model } from 'mongoose';

const userchema = new Schema({
    email:{
        type:String,
        required:[true,"Please provide your email"],
        trim: true, // limpiar los datos a la derecha e izquierda.
        unique: true,
        lowercase: true,
        index: { unique: true },
    },
    password:{
        type: string,
        require: [true, "Please provide a password"],
    }
});


export const User = model("user", userSchema);