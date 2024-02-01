const  DoneTickbox = (goalItems, goals, setGoals ) => {
    const handleCheckbox = () => {
        const newGoals = goals.map(goal => {
            if(goalItems.id === goal.id) {
                return {...goal, done: !goal.done}
            }
            return goal
        })
        setGoals(newGoals);
    }

    return <input type='checkbox' className='doneTickbox mr-2' onClick={handleCheckbox} />
}
export default DoneTickbox;