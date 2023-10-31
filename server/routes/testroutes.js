import express from 'express';
import Test from "../models/Test.js";
const testRouter = express.Router();

testRouter.post("/", async (req, res) => {
  const {name, mail} = req.body;
try {   
      const response = await Test.create({name, mail});
      res.status(201).json(response);
    } catch(err){       
        res.status(500).json(err)
    }
  });


testRouter.get("/", async (req, res) => {
    try {
      const response = await Test.find();
      res.json(response)
    } 
    catch(err){
        res.status(500).json(err)
    }
});

testRouter.get("/:id", async(req, res)=> {
    try {
        const id = req.params.id
      const response = await Test.findById(id);
      res.json(response)
    } catch(err){
        res.status(500).json(err);
    }
});

testRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
      const response = await Test.findByIdAndDelete(id);
      if (!response) {
          res.status(404).json({ error: "User doesn't exit" });
          return;
      }
      res.status(201).json(response);
  } catch (err) {
      res.status(500).json({ message: "Internal server error", error: err.message });
  }
});

export default testRouter;