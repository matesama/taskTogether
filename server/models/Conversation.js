import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema (
	{
		members:{
			type: Array,
			required: true,
		},
		groupName:{
			type: String,
		},
		groupPicture:{
			type: String,
		}
	},
	{ timestamps: true }
);


const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;