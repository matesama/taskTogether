import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    
    const getData = async (e) => {
        
        try {    
            e.preventDefault();

            const requestData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            };
            const getResponse = await fetch('http://localhost:8000/api/login', requestData);
            const data = await getResponse.json();
            console.log(data);


        }catch(error) {
            console.log(error.message);
        }finally {
            //loader
        }
    
    } 
      
    return(
        <div className="text-slate-300 flex flex-row">
            <div className="w-6/12  min-h-screen bg-slate-950 min-w-screen flex flex-col justify-between" >
                <h2 className="font-bold text-2xl text-start pl-5 pt-5 mt-5 ml-5 w-8/12">Set Goals, Stay Accountable, Succeed Together</h2>
                <h2 className="font-bold mb-5 ml-5 text-2xl self-start pl-5 pb-5">taskTogether</h2>
            </div>
            <form onSubmit={getData} className="bg-slate-800 w-6/12 m-0 min-h-screen min-w-screen flex justify-center items-center">
                <div className="flex flex-col  m-0 items-center rounded-md border-slate-300 border-solid border-2 text-slate-300 p-12">
                    <h2 className="font-bold mb-5 text-3xl">Sign In</h2>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-sm text-start mb-0">Email</label>
                        <input id='email' onChange={(e)=>{setEmail(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <label htmlFor='password' className="text-sm text-start mt-3 mb-0">Password</label>
                        <input type="password" id="password" onChange={(e)=>{e.target.value}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <input type="submit" id="submitLoginButton" value="Sign In" className="bg-slate-500 w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500"/>
                        <input type="button" id="linkToRegister" value='Not registered yet? Create an Account' onClick={()=> navigate("/register")} className="underline underline-offset-1"/>
                    </div>
                </div>
            </form>
        
        </div>
    )
}

export default Login;