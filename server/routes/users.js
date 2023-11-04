import express from 'express';
import User from "../models/User.js";
const userRouter = express.Router();

// get all users
// userRouter.get("/", async (req, res) => {
// 	try {
// 	  const users = await User.find();
// 	  const sanitizedUsers = users.map((user) => {
// 		const { password, updatedAt, ...other } = user._doc;
// 		return other;
// 	  });
// 	  res.status(200).json(sanitizedUsers);
// 	} catch (err) {
// 	  res.status(500).json(err);
// 	}
//   });


//get a user
userRouter.get("/", async (req, res) => {
	const userId = req.query.userId;
	const username = req.query.username;
	try {
	  const user = userId
		? await User.findById(userId)
		: await User.findOne({ username: username });
	  const { password, updatedAt, ...other } = user._doc;
	  res.status(200).json(other);
	} catch (err) {
	  res.status(500).json(err);
	}
});

//delete user
userRouter.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
	  try {
		await User.findByIdAndDelete(req.params.id);
		res.status(200).json("Account has been deleted");
	  } catch (err) {
		return res.status(500).json(err);
	  }
	} else {
	  return res.status(403).json("You can delete only your account!");
	}
});

//update user
userRouter.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
	  if (req.body.password) {
		try {
		  const salt = await bcrypt.genSalt(10);
		  req.body.password = await bcrypt.hash(req.body.password, salt);
		} catch (err) {
		  return res.status(500).json(err);
		}
	  }
	  try {
		const user = await User.findByIdAndUpdate(req.params.id, {
		  $set: req.body,
		});
		res.status(200).json("Account has been updated");
	  } catch (err) {
		return res.status(500).json(err);
	  }
	} else {
	  return res.status(403).json("You can update only your account!");
	}
});

//get contacts
userRouter.get("/contacts/:userId", async (req, res) => {
	try {
	  const user = await User.findById(req.params.userId);
	  const contacts = await Promise.all(
		user.followings.map((contactId) => {
		  return User.findById(contactId);
		})
	  );
	  let contactList = [];
	  contacts.map((contact) => {
		const { _id, username, profilePicture } = contact;
		contactList.push({ _id, username, profilePicture });
	  });
	  res.status(200).json(contactList)
	} catch (err) {
	  res.status(500).json(err);
	}
});

export default userRouter;