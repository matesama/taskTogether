import express from "express";
import User from "../models/User.js"
import bcrypt from "bcrypt";

const authRouter = express.Router();


authRouter.get("/", async (req, res) => {
    try {
      const response = await User.find();
      res.json(response)
    } 
    catch(err){
        res.status(500).json(err)
    }
});

authRouter.post('/register', async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const response = await User.create({username, email, password})
        res.json(response);
        

    }catch(err){
        res.status(500).json({error: err.message});
    }
});

authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).send({error: 'User not found'});
        }

        /*const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid){
            return res.status(400).send({error:"Password invalid"});
        }*/

        res.json( user );

    }catch(err){
        res.status(500).send(err.message);
    }
})

export default authRouter;

// import express from 'express';
// import bcrypt from 'bcrypt';
// import User from "../models/User.js";
// const authRouter = express.Router();


// authRouter.post("/register", async (req, res) => {
//   try {
//     //generate new password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     //create new user
//     const newUser = new User({
//       username: req.body.username,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     //save user and respond
//     const user = await newUser.save();
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

// authRouter.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
// 	if (!user){
//     	res.status(404).json("user not found");
// 	}

//     const validPassword = await bcrypt.compare(req.body.password, user.password)
//     if (!validPassword){
// 		res.status(400).json("wrong password");
// 	}

//     res.status(200).json(user)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

// export default authRouter;