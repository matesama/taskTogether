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
        const {name, email, password} = req.body;

        const response = await User.create({name, email, password})
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