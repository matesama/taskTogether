import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";
import Loader from "../components/Loader.jsx";



const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
    const [loader, setLoader] = useState(false);
    const {login} = useContext(UserContext)

    const clearErrors = () => {
        setErrors({});
    }
    const getData = async (e) => {
        e.preventDefault();
        // console.log("pre")
        login(email, password, setLoader, setErrors, clearErrors)
        // console.log("post")
    }
    // console.log(errors)
    return(
        <div className="text-slate-300 flex  lg:flex-row">
            <div className="max-lg:invisible w-6/12 max-lg:w-0  min-h-screen bg-slate-950 min-w-screen flex flex-col justify-between" >
                <h2 className="font-bold text-2xl text-start pl-5 pt-5 mt-5 ml-5 w-8/12">Set Goals, Stay Accountable, Succeed Together</h2>
                <h2 className="font-bold mb-5 ml-5 text-2xl self-start pl-5 pb-5">taskTogether</h2>
            </div>
            {loader ? (<Loader />) :
            <form onSubmit={getData} className="bg-slate-800 w-6/12 max-lg:w-screen m-0 min-h-screen min-w-screen flex max-lg:flex-col justify-center items-center">
                <h2 className=" lg:invisible lg:w-0 font-bold  text-2xl mb-4">taskTogether</h2>
                <h4 className=" lg:invisible lg:w-0 font-bold text-2xl mb-12 w-8/12">Set Goals, Stay Accountable, Succeed Together</h4>
                <div className="flex flex-col max-sm:w-10/12 max-md:w-8/12  m-0 items-center rounded-md border-slate-300 border-solid border-2 text-slate-300 p-10">
                    <h2 className="w-full font-bold mb-5 text-3xl">Sign In</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="w-full text-sm text-start mb-0">Email</label>
                        <input id='email' type="email" onChange={(e)=>{setEmail(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <label htmlFor='password' className="text-sm text-start mt-3 mb-0">Password</label>
                        <input type="password" id="password" onChange={(e)=>{ setPassword(e.target.value) }} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <input type="submit" id="submitLoginButton" value="Sign In" className="bg-slate-500 w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500 cursor-pointer"/>
                        <input type="button" id="linkToRegister" value='Not registered yet? Create an Account' onClick={()=> navigate("/register")} className="w-full underline underline-offset-1 cursor-pointer"/>
                    </div>
                </div>
            </form> }
            <div className="text-white text-2xl">{errors > 0 ? <p>{errors}</p> : null }</div>
        </div>
    )
}
export default LoginPage;