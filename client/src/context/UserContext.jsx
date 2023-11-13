import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();


const UserProvider = ( {children} ) => {
    const navigate = useNavigate();
    //Init user state
    const [user, setUser] = useState(null);
    //Init state for token from sessionStorage
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    
    

    const login = async (email, password, setLoader, setErrors, clearErrors) => {
        
        try {
           
                setLoader(true);

                /*const requestData = {
                    //method: 'POST',
                    //headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: password })
                };*/
                const getResponse = await axios.post('http://localhost:8000/api/auth/login', {email, password}, {headers: { 'Content-Type': 'application/json' }});
                //const data = await getResponse.json();
                
                //Check token: If valid redirect to navigate
                const token = getResponse.data.token;
                /*if(!token) {
                    setErrors(data);
                    setTimeout(clearErrors, 2000);
                }*/
                sessionStorage.setItem('token', token);
                setUser(getResponse.data.user);
                setToken(token);
                if(token){
                    navigate('/');
                }
            }catch(error) {
                setErrors(error.response.data.error);
                console.log(error);
            }finally {
                setLoader(false);
            }
    }

    const logout = () => {
        sessionStorage.removeItem('token');
        setUser(null);
        setToken(null);
        navigate('/login');
    }


    return(
        <UserContext.Provider value={{user, token, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;