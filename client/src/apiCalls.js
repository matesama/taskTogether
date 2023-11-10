import axios from 'axios';

const loginCall = async (userCredential, dispatch) => {

    try{
        dispatch({type: "LOGIN_START"});
        const response = await axios.post("http://localhost:8000/api/auth/login", userCredential)
        // console.log(response);
        dispatch({type: "LOGIN_SUCCESS", payload: response.data })

    } catch(err){
        dispatch({type: "LOGIN_FAILURE", payload: err })
    }
}

export default loginCall;