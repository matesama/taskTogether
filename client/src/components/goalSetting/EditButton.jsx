const EditButton = ({edit, setEdit}) => {

    const handleEditButton = () => {
        setEdit(true);
    }
    
    return <button type='button' className='editButton mx-4 border rounded-md bg-slate-800 text-white px-2 hover:bg-white hover:text-slate-800' onClick={handleEditButton}>Edit</button>
}

export default EditButton;