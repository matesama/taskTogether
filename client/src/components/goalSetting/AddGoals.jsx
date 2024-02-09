import {useEffect, useState} from 'react';
import GoalItem from './GoalItem';
import axios from 'axios';

const AddGoals = () => {
    const [goals, setGoals] = useState([]);
	const [newGoal, setNewGoal] = useState('');

	//Load goals from server on component mount
   
        useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/goals');
                const fetchedGoals = response.data;
                //filter empty goals setting them in a state
                //const nonEmptyGoals = fetchedGoals.filter((goal) => goal.text.trim() !== '');
                //setGoals(nonEmptyGoals);
                console.log(fetchedGoals),
                setGoals(fetchedGoals);
                console.log(goals);
                if (fetchedGoals[0].goals.length > 0) {
                    setNewGoal(fetchedGoals[0].goals);
                }             
            } catch (error) {
                console.error('Error fetching goals', error);
            }
        };
        fetchGoals();

    }, []);



    const handleSetGoal = (e) => {
        e.preventDefault();
        if (newGoal.trim().length === 0) {
            return alert('Please type in a new goal');
        } 
        const goalExists = goals.some((goalItem) => goalItem.text === newGoal)
        if(goalExists) {
            //update goal in array, if goal exists
            const updatedGoals = goals.map((goalItem) => 
            goalItem.text === newGoal ? {...goalItem, text: newGoal} : goalItem
            );
            setGoals(updatedGoals);
        }
        else {
            //If The goals does not exist, add it to the array
            let randomID = Math.random() * 100000;
            const goalItems = {
                id: randomID,
                text: newGoal,
                done: false
            };
            setGoals([...goals, goalItems])
		    setNewGoal('');
        }
    };

    const saveGoals = async () => {
		try{

            //Send goals string array to the db
            const goalTexts = goals.map((goalItem) => goalItem.text)
			//Make POST request to save goals
			const response = await axios.post('http://localhost:8000/api/goals', { goals: goalTexts });
			console.log('Goals saved:', response.data);
			
			// Clear the goals input
			//setGoals([]);
		} catch (error) {
		  console.error('Error saving goals:', error);
		}
	  };

    return(
        <div>
            <div className='flex flex-col justify-center'>
				<h2 className='text-4xl mb-4'>Daily Goals</h2>
			
                <form onSubmit={handleSetGoal}>
                    <input type='text' placeholder='Enter a new Goal' value={newGoal} onChange={(e)=>setNewGoal(e.target.value)} />
                    <button type="submit" className='ml-2 border px-2 bg-slate-800 text-white rounded-md hover:bg-white hover:text-slate-800'>Set Goal</button>
                </form>    			
            </div>

            <ul className='list'>
                {goals.map((goalItems, index) => (
                  <GoalItem key={index} goalItems={goalItems} goals={goals} setGoals={setGoals} />
                ))}
            </ul>
            <button onClick={saveGoals} className='ml-2 border px-2 bg-slate-800 text-white rounded-md hover:bg-white hover:text-slate-800'>Save your Goals</button>

        </div>
    )
}

export default AddGoals;