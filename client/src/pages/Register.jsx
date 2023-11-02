import {useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});

    const getData = async (e) => {
        e.preventDefault();
        try {
                //loader insert here
            //set data for Post    
            const requestData = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password })
            } 

            //custom email regex -> validate email
            const regex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
            if (!regex.test(email)) {
              console.log(regex.test(email))
              setError({error: 'Please insert a valid email format'});
              console.log(error);
              /*setTimeout(clearErrors, 2000);*/
              return;
            }
            //connect to server 
            const getResponse = await fetch('http://localhost:8000/api/register', requestData);
            console.log(getResponse);
            const data = await getResponse.json();
            console.log(data);
            setError(data);

            if(!data) throw new Error({error: `Fetching Data failed, due to:${data.status}`})
        console.log(error);
          if(error){
                navigate('/login');
            }
        } catch(error) {
            console.log({error: error.message});
        } finally {
            //loader
        }
    }
    return(
        <>
        <div>
            <form onSubmit={getData}>
                <h2>Create Account</h2>
                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <input id="name" onChange={(e)=>{setName(e.target.value)}} required />
                    <label htmlFor="email">Email</label>
                    <input id="email" onChange={(e)=>{setEmail(e.target.value)}} required />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} required />
                    <input type="submit" id="registerSubmitButton" value="Create Account" className="rounded" />
                    <input type="button" id="linkToLogin" value='Sign In' onClick={()=> navigate("/login")} />
                </div>
                <div>

                </div>


            </form>
        </div>
        </>
    )
}

export default Register;