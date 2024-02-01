import Goal from "../models/Goal.js";
import express  from "express";

const goalRouter = express.Router();

goalRouter.post("/", async (req, res) => {
    try {
        const {goals} = req.body;
        if(!Array.isArray(goals) || goals.length === 0) {
            return res.status(400).json({ message: 'Invalid goal data'})
        }

        //validate for goals and limit of 3:
        if(goals.length > 3) {
            return res.status(400).json( {message: 'Invalid goals data' });
        }

        //find doc that holds goals array
        let goalDoc = await Goal.findOne();

        if(!goalDoc) {
            //if no doc, create a new one
            goalDoc = new Goal({goals: [] });
        }

        //Update goals in the doc
        goalDoc.goals = goals;

        //Save the updated goals doc
        await goalDoc.save();

        /*//copy the goals array
        const updatedGoals = [...goalDoc.goals];

        goals.forEach((goal) => {
            //check if goals already exists in the array
            const goalIndex = updatedGoals.findIndex((goalItem) => goalItem === goal)
            if (goalIndex !== -1) {
                //If the goal exists, update it in the array
                updatedGoals[goalIndex] = goal;
            } else {
                //if goal does not exist, add it to the array
                updatedGoals.push(goal);
            }
        });

        //UPdate goals array in doc
        goalDoc.goals = updatedGoals;
        await goalDoc.save();
        res.status(201).json(goalDoc);

        /*create goals doc:
        const newGoal = new Goal({
            goals: goals,
            completed: false,
        })

        //save new Goals in DB:
        const savedGoal = await newGoal.save();
        */
        res.status(201).json(goalDoc);

    } catch(err) {
        res.status(500).json(err);

    } finally {

    }
});

goalRouter.get("/", async (req, res) => {
    try {
        const goals = await Goal.find().sort({ createdAt: -1 });

        res.status(200).json(goals);
    } catch(err) {
        res.status(500).json(err);

    } 
});

goalRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        //Remove the goal from DB by ID
        const deleteGoal = await Goal.findByIdAndRemove(id);
        if(!deleteGoal) {
            return res.status(404).json({ message: 'Goal not found'});
        }
        req.status(200).json({ message: 'Goal deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
})

goalRouter.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { text } = req.body;
  
      // Find the goal by ID
      const goal = await Goal.findById(id);
  
      if (!goal) {
        return res.status(404).json({ message: 'Goal not found' });
      }
  
      // Update the goal text
      goal.text = text;
  
      // Save the updated goal
      const updatedGoal = await goal.save();
  
      res.status(200).json(updatedGoal);
    } catch (error) {
      res.status(500).json({ message: 'Error updating goal', error: error.message });
    }
  });



export default goalRouter;