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
                }
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



// import { createContext, useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client';

// export const UserContext = createContext();


// const UserProvider = ( {children} ) => {
//     const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null)
//     const [token, setToken] = useState(sessionStorage.getItem('token') || null);
//     const [isConnected, setIsConnected] = useState(false);
//     const navigate = useNavigate();
//     const socket = useRef();



//     const connectSocket = () => {
//         if (user) {
//           socket.current = io('ws://localhost:8100');
//           socket.current.on('connect', () => setIsConnected(true));
//         }
//       }

//       useEffect(() => {
//         connectSocket();
//         return () => {
//           if (socket.current) {
//             socket.current.disconnect();
//           }
//         };
//       }, [user]);

//     const login = async (email, password, setLoader, loader, setErrors) => {
//         const clearErrors = () => {
//             setErrors({});
//         }
//         try {
//                 setLoader(!loader);

//                 const requestData = {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ email: email, password: password })
//                 };
//                 const getResponse = await fetch('http://localhost:8000/api/auth/login', requestData);
//                 const data = await getResponse.json();

//                 //Check token: If valid redirect to navigate
//                 const token = data.token;
//                 if(!token) {
//                     setErrors(data);
//                     setTimeout(clearErrors, 2000);
//                 }
//                 // sessionStorage.setItem('token', token);
//                 setUser(data.user);
//                 setToken(token);
//                 if(token){
//                     connectSocket(user);
//                     navigate('/');
//                 }
//             }catch(error) {
//                 console.log(error.message);
//             }finally {
//                 setLoader(false);
//             }
//     }

//     const logout = () => {
//         sessionStorage.removeItem('token');
//         setUser(null);
//         setToken(null);
//         socket.current.emit("logout");
//         navigate('/login');
//     }


//     return(
//         <UserContext.Provider value={{ user, token, login, logout, socket }}>
//             {children}
//         </UserContext.Provider>
//     )
// }
// export default UserProvider;




///////////////OLD/////////////////////

// import { createContext, useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { io } from 'socket.io-client';

// export const UserContext = createContext();


// const UserProvider = ( {children} ) => {
//     const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || null)
//     const [token, setToken] = useState(sessionStorage.getItem('token') || null);
//     // const [isConnected, setIsConnected] = useState(false);
//     // const [socket, setSocket] = useState(null);
//     const navigate = useNavigate();




//     const connectSocket = () => {
//         if (user) {
//           const newSocket = io('ws://localhost:8100');
//           newSocket.on('connect', () => setIsConnected(true));
//         //   setSocket(newSocket);
//         }
//       }

//       useEffect(() => {
//         connectSocket();
//         return () => {
//           if (socket.current) {
//             socket.current.disconnect();
//           }
//         };
//       }, [user]);

//     const login = async (email, password, setLoader, loader, setErrors) => {
//         const clearErrors = () => {
//             setErrors({});
//         }
//         try {
//                 setLoader(!loader);

//                 const requestData = {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ email: email, password: password })
//                 };
//                 const getResponse = await fetch('http://localhost:8000/api/auth/login', requestData);
//                 const data = await getResponse.json();

//                 //Check token: If valid redirect to navigate
//                 const token = data.token;
//                 if(!token) {
//                     setErrors(data);
//                     setTimeout(clearErrors, 2000);
//                 }
//                 sessionStorage.setItem('token', token);
//                 setUser(data.user);
//                 setToken(token);
//                 if(token){
//                     connectSocket(user);
//                     navigate('/');
//                 }
//             }catch(error) {
//                 console.log(error.message);
//             }finally {
//                 setLoader(false);
//             }
//     }

//     const logout = () => {
//         sessionStorage.removeItem('token');
//         setUser(null);
//         setToken(null);
//         if (socket) {
//             socket.current.emit("logout");
//         }
//         navigate('/login');
//     }


//     return(
//         <UserContext.Provider value={{ user, token, login, logout, socket }}>
//             {children}
//         </UserContext.Provider>
//     )
// }
// export default UserProvider;