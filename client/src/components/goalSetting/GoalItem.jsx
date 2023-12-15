import {useState, useEffect} from 'react';
import DoneTickbox from './DoneTickbox';
import DeleteButton from './DeleteButton';


const GoalItem = ({ goalItems, goalsList, setGoalsList, goal}) => {
    const [updateGoal, setUpdateGoal] = useState(goalItems.text);
    const [isEmpty, setIsEmpty] = useState(false);

  

    const checkForEmptyGoal = () => {
        setIsEmpty(updateGoal.trim().length === 0);
    }

    useEffect(() => {
        checkForEmptyGoal();
    }, [updateGoal])

    const handleInputChange = (e) => {
        setUpdateGoal(e.target.value);
        setIsEmpty(e.target.value.trim.length === 0);
    }
    

    return(
        <div>
            <li className="mt-8 bg-slate-100 border rounded-md mx-4" key={goalItems.id}  >
                <DoneTickbox goalItems={goalItems} goalsList={goalsList} setGoalsList={setGoalsList} />
                <input type='text' value={updateGoal}  key={goalItems.id} onChange={handleInputChange}className={`bg-transparent focus:bg-white hover:bg-white focus: mr-2  ${isEmpty ? ' border-2 border-red-500 rounded-md' : ''}`}/>  
                <DeleteButton goalItems={goalItems} setGoalsList={setGoalsList} />
                {isEmpty && <p className='text-red-500'>Please enter a Goal</p>}
            </li>
        </div>
    )
}

export default GoalItem;