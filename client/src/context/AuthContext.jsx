import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  /*user: { _id: "654401ef6a02e04b0eea2bc4",
          username: "TestUser1",
          email: "testuser1@mail.com",
          profilePicture: "",
          contacts: [],
          isAdmin: false,
        }*/
        //user: null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext