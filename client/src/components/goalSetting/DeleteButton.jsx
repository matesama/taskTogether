import trash from '../../assets/trash.svg'

const DeleteButton = ({ goalItems, goals, setGoals }) => {
    const handleDeleteButton = (id) => {
        setGoals(goals => {
            return goals.filter(goalItems => goalItems.id != id);
        })
    }

    return <button type="button" className="deleteButton underline hover:bg-slate-200  " onClick={() => handleDeleteButton(goalItems.id)}><img src={trash} alt="delete button" className="w-5 h-5"/></button>; 
};
export default DeleteButton;