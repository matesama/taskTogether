import trash from '../../assets/trash.svg'

const DeleteButton = ({ goalItems, goalsList, setGoalsList }) => {
    const handleDeleteButton = (id) => {
        setGoalsList(goalsList => {
            return goalsList.filter(goalItems => goalItems.id != id);
        })
    }

    return <button type="button" className="deleteButton underline text-slate-800 hover:text-slate-400" onClick={() => handleDeleteButton(goalItems.id)}><img src={trash} alt="delete button" className="w-5 h-5"/></button>; 
};
export default DeleteButton;