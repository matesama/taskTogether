const  DoneTickbox = (goalItems, goalsList, setGoalsList ) => {
    const handleCheckbox = () => {
        const newGoals = goalsList.map(goal => {
            if(goalItems.id === goal.id) {
                return {...goal, done: !goal.done}
            }
            return goal
        })
        setGoalsList(newGoals);
    }

    return <input type='checkbox' className='doneTickbox mr-2' onClick={handleCheckbox} />
}
export default DoneTickbox;