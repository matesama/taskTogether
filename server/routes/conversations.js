import express from 'express';
import Conversation from "../models/Conversation.js";
const conversationRouter = express.Router();


// get all group conversations

conversationRouter.get("/allGroups", async (req, res) => {
	try {
	  const conversations = await Conversation.find({ groupName: { $ne: "" } });
	  const sanitizedConversation = conversations.map((conversation) => {
		const {...other } = conversation._doc;
		return other;
	  });
	  res.status(200).json(sanitizedConversation);
	} catch (err) {
	  console.error(err);
	  res.status(500).json(err);
	}
  });


  //get conv of a user

conversationRouter.get("/:userId", async (req, res) => {
	try {
		const conversation = await Conversation.find({
			members: {$in: [req.params.userId]}
		}
		);
		res.status(200).json(conversation);
	}catch(err){
		res.status(500).json(err);
	}
})


//new conv

conversationRouter.post("/", async (req, res) => {
	const newConversation = new Conversation({
	  members: req.body.members,
	  groupName: req.body.groupName,
	  groupPicture: req.body.groupPicture
	})
	try {
	  const savedConversation = await newConversation.save();
	  res.status(200).json(savedConversation);
	} catch(err) {
	  res.status(500).json(err);
	}
});


// join conversation

conversationRouter.post("/join/:conversationId", async (req, res) => {
	const { userId } = req.body;
	const { conversationId } = req.params;

	try {
	  const conversation = await Conversation.findById(conversationId);
	  if (!conversation) {
		return res.status(404).json({ message: 'Conversation not found' });
	  }

	  if (conversation.members.includes(userId)) {
		return res.status(400).json({ message: 'User already in the conversation' });
	  }

	  conversation.members.push(userId);
	  const updatedConversation = await conversation.save();

	  res.status(200).json(updatedConversation);
	} catch (err) {
	  console.error(err);
	  res.status(500).json(err);
	}
  });

export default conversationRouter;