import express from 'express';
import Conversation from "../models/Conversation.js";
const conversationRouter = express.Router();

//new conv

conversationRouter.post("/", async (req, res) => {
	const newConversation = new Conversation({
		members:[req.body.senderId, req.body.receiverId]
	})
	try {
		const savedConversation = await newConversation.save();
		res.status(201).json(savedConversation);
	}catch(err){
		res.status(500).json(err);
	}
})



// testRouter.post("/", async (req, res) => {
// 	const {name, mail} = req.body;
//   try {
// 		const response = await Test.create({name, mail});
// 		res.status(201).json(response);
// 	  } catch(err){
// 		  res.status(500).json(err)
// 	  }
// 	});

//get conv of a user

export default conversationRouter;