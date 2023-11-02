import mongoose from "mongoose";

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Please insert your name"]
    },
    email: {
        type: String,
        required: [true, "Please insert a valid email"],
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please insert a password"]
    }

})

const User = mongoose.model('User', UserSchema);
export default User;

