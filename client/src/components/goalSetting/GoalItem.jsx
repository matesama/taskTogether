import {useState, useEffect} from 'react';
import DoneTickbox from './DoneTickbox';
import DeleteButton from './DeleteButton';
import axios from 'axios';


const GoalItem = ({ goalItems, goals, setGoals}) => {
    const [updateGoal, setUpdateGoal] = useState(goalItems?.text || '');
    const [isEmpty, setIsEmpty] = useState(false);
   

  

    const checkForEmptyGoal = () => {
        setIsEmpty(updateGoal.trim().length === 0);
    }

    useEffect(() => {
        checkForEmptyGoal();
    }, [updateGoal])

    const handleInputChange = (e) => {
        setUpdateGoal(e.target.value);
    };


    //onBlur saves goals when input loses focus
    const handleSaveEdit = async () => {
        try {
            // Update the goal on the server
            const response = await axios.put(`http://localhost:8000/api/goals/${goalItems._id}`, {
              text: updateGoal,
            });
            console.log('Goal updated:', response.data);
      
            // Update the goal in the frontend state
            const updatedGoals = goals.map((goal) =>
              goal.id === goalItems.id ? { ...goal, text: updateGoal } : goal
            );
            setGoals(updatedGoals);
          } catch (error) {
            console.error('Error updating goal:', error);
          }
    };
    


    const handleDelete = async () => {
        try {
            let response = await axios.delete(`http://localhost:8000/api/goals/${goalItems._id}`);
            console.log('Goal deleted:', response.data);
            const updatedGoals = goals.filter(
                (goal) => goal.id !== goalItems.id
            );
            setGoals(updatedGoals);
        } catch(error) {
            console.error('Error deleting goals:', error); 
        }
    }
    

    return(
        <div>
            <li className="mt-8 bg-slate-100 border rounded-md mx-4" key={goalItems.id}  >
                <DoneTickbox goalItems={goalItems} goals={goals} setGoals={setGoals} />
                <input type='text' value={updateGoal}  key={goalItems.id} onChange={handleInputChange} onBlur={handleSaveEdit} className={`bg-transparent focus:bg-white hover:bg-white focus: mr-2  ${isEmpty ? ' border-2 border-red-500 rounded-md' : ''}`}/>  
                <DeleteButton goalItems={goalItems} setGoals={setGoals} onDelete={handleDelete} />
                {isEmpty ? <p className='text-red-500'>Please enter a Goal</p> : null}
            </li>
        </div>
    )
}

export default GoalItem;