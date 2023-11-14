import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();


const UserProvider = ( {children} ) => {
    const navigate = useNavigate();
    //Init user state
    const [user, setUser] = useState(sessionStorage.getItem('user') ||null);
    //Init state for token from sessionStorage
    const [token, setToken] = useState(sessionStorage.getItem('token') || null);
    
    
   useEffect(() => {
        const loadUserData = async () => {
            try {
                //check token in sessionStorage
                const storedToken = sessionStorage.getItem('token');
                if(storedToken) {
                    const response = await axios.get('http://localhost:8000/api/auth/user', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    //set User Data on successful response
                    setUser(response.data);
                    console.log(response);
                } 
                } catch(error) {
                    console.error('Failed to fetch user data', error);
                    logout();
            }
        };
        loadUserData();
    }, [token])


    const login = async (email, password, setLoader, setErrors, clearErrors) => {
        
        try {
           
                setLoader(true);

                /*const requestData = {
                    //method: 'POST',
                    //headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email, password: password })
                };*/
                const getResponse = await axios.post('http://localhost:8000/api/auth/login', {email, password}, {headers: { 'Content-Type': 'application/json' }});
                const data = await getResponse.json();
                
                //Check token: If valid redirect to navigate
                const token = data.token;
                const user = data.user;
                if(!token) {

                    setErrors(data);
                    setTimeout(clearErrors, 2000);
                }*/
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('user', JSON.stringify(user));
                setUser(user);

                setToken(token);
                console.log(token);
                console.log(user);
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
        sessionStorage.removeItem('user');
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