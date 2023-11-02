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
        <div>
            <h2>Sign In</h2>
            <form onSubmit={getData}>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input id='email' onChange={(e)=>{setEmail(e.target.value)}} required />
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" onChange={(e)=>{e.target.value}} required />
                    <input type="submit" id="submitLoginButton" value="Sign In" />
                    <input type="button" id="linkToRegister" value='Create Account' onClick={()=> navigate("/register")} />
                </div>
            </form>
        
        </div>
    )
}

export default Login;