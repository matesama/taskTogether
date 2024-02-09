import mongoose from "mongoose";

const goalLimit = (goals) => {
    return goals.length <= 3;
}

const GoalSchema = new mongoose.Schema (
    {
        goals: {
            type: [{
            type: String,
            trim: true,
            default: ['Type in a new Goal'],
            }],
            validate: [goalLimit, '{PATH} exceeds the limit of 3'],
        },
            completed: {
            type: Boolean,
            default: false,
            },  
        },
        { timestamps: true }
    );




const Goal = mongoose.model('Goal', GoalSchema)
export default Goal;