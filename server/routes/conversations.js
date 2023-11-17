import express from 'express';
import Conversation from "../models/Conversation.js";
import multer from 'multer';
import path from 'path';

const conversationRouter = express.Router();



// get one conversation

conversationRouter.get('/find/:id', async (req, res) => {
	if (!req.params.id) {
		return res.status(400).json({ message: 'Invalid id' });
	}
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.json(conversation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

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
//group Img

const storage = multer.memoryStorage();
const upload = multer({
	storage: storage,
})

conversationRouter.post("/", upload.single('groupPicture'), async (req, res) => {
	try {

		const { members, groupName} = req.body;
		let imgBase64 = '';

		if(req.file) {
			imgBase64 = req.file.buffer.toString('base64');
		}

		const newConversation = new Conversation({
			members,
			groupName,
			groupPicture: imgBase64
		});
		const response = await newConversation.save();

	  res.status(200).json(response);
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