import {useState} from 'react';
import GoalItem from './GoalItem';

const AddGoals = () => {
    const [goal, setGoal] = useState("");
    const [goalsList, setGoalsList] = useState(() => {
        const savedGoals = localStorage.getItem('goalsList')
        if(savedGoals) {
            return JSON.parse(savedTasks);
        } else {
            return [];
        }
    })

    const handleSetGoal = (e) => {
        if (goal === '') {
            return alert('Please type in a new goal');
        } else {
            e.preventDefault();
            let randomID = Math.random() * 100000;
            const goalItems = {
                id: randomID,
                text: goal,
                done: false
            };
            setGoalsList([...goalsList, goalItems])
            setGoal("");
        }
    };

    return(
        <div>
            <div className='flex flex-col justify-center'>
				<h2 className='text-4xl mb-4'>Daily Goals</h2>
			
                <form onSubmit={handleSetGoal}>
                    <input type='text' placeholder='Enter a new Goal' value={goal} onChange={(e)=>setGoal(e.target.value)} />
                    <button type="submit" className='ml-2 border px-2 bg-slate-800 text-white rounded-md hover:bg-white hover:text-slate-800'>Set Goal</button>
                </form>    			
            </div>

            <ul className='list'>
                {goalsList.map((goalItems, index) => (
                  <GoalItem key={index} goalItems={goalItems} goalsList={goalsList} setGoalsList={setGoalsList} goal={goal} setGoal={setGoal}/>
                ))}
            </ul>


        </div>
    )
}

export default AddGoals;