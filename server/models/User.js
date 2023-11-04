import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	username:{
		type: String,
		required: [true, "Please insert your name"],
		min: 3,
		max: 20,
		unique: true
	},
	email:{
		type: String,
		required: [true, "Please insert a valid email"],
		match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true,
        lowercase: true,
        trim: true,
		max: 50,
	},
	password:{
		type: String,
		required: [true, "Please insert a password"],
		min: 8,
	},
	profilePicture:{
		type: String,
		default: ""
	},
	contacts:{
		type: Array,
		default: []
	},
	isAdmin:{
		type: Boolean,
		default: false,
	}
},
{timestamps: true}
);


const User = mongoose.model('User', UserSchema);

export default User;