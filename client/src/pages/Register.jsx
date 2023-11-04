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
                body: JSON.stringify({ username: name, email: email, password: password })
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
            const getResponse = await fetch('http://localhost:8000/api/auth/register', requestData);
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
        <div className="text-slate-300 flex flex-row">
            <div className="w-6/12  min-h-screen bg-slate-950 min-w-screen flex flex-col justify-between" >
            <h2 className="font-bold text-2xl text-start pl-5 pt-5 mt-5 ml-5 w-8/12">Achieve More Together. Your DailyGoals, Our Common Mission</h2>
            <h2 className="font-bold mb-5 ml-5 text-2xl self-start pl-5 pb-5">taskTogether</h2>

            </div>
            <form onSubmit={getData} className="bg-slate-800 w-6/12 m-0 min-h-screen min-w-screen flex justify-center items-center">
                <div className="flex flex-col  m-0 items-center rounded-md border-slate-300 border-solid border-2 text-slate-300 p-12">
                    <h2 className="font-bold mb-5 text-3xl">Create Account</h2>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm text-start mb-0">Name</label>
                        <input id="name" onChange={(e)=>{setName(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <label htmlFor="email" className="text-sm text-start mt-3 mb-0">Email</label>
                        <input id="email" type="email" onChange={(e)=>{setEmail(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <label htmlFor="password" className="text-sm text-start mt-3 mb-0">Password</label>
                        <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
                        <input type="submit" id="registerSubmitButton" value="Create Account" className="bg-slate-500 w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500" />
                        <input type="button" id="linkToLogin" value='Already registered? Sign In' onClick={()=> navigate("/login")} className="underline underline-offset-1"/>
                    </div>
                </div>    
            </form>
        </div>
        </>
    )
}

export default Register;

// import {useState} from "react";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const navigate = useNavigate();
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState({});

//     const getData = async (e) => {
//         e.preventDefault();
//         try {
//                 //loader insert here
//             //set data for Post
//             const requestData = {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: name, email: email, password: password })
//             }

//             //custom email regex -> validate email
//             const regex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/;
//             if (!regex.test(email)) {
//               console.log(regex.test(email))
//               setError({error: 'Please insert a valid email format'});
//               console.log(error);
//               /*setTimeout(clearErrors, 2000);*/
//               return;
//             }
//             //connect to server
//             const getResponse = await fetch('http://localhost:8000/api/register', requestData);
//             console.log(getResponse);
//             const data = await getResponse.json();
//             console.log(data);
//             setError(data);

//             if(!data) throw new Error({error: `Fetching Data failed, due to:${data.status}`})
//         console.log(error);
//           if(error){
//                 navigate('/login');
//             }
//         } catch(error) {
//             console.log({error: error.message});
//         } finally {
//             //loader
//         }
//     }
//     return(
//         <>
//         <div className="text-slate-300 flex flex-row">
//             <div className="w-6/12  min-h-screen bg-slate-950 min-w-screen flex flex-col justify-between" >
//             <h2 className="font-bold text-2xl text-start pl-5 pt-5 mt-5 ml-5 w-8/12">Achieve More Together. Your DailyGoals, Our Common Mission</h2>
//             <h2 className="font-bold mb-5 ml-5 text-2xl self-start pl-5 pb-5">taskTogether</h2>

//             </div>
//             <form onSubmit={getData} className="bg-slate-800 w-6/12 m-0 min-h-screen min-w-screen flex justify-center items-center">
//                 <div className="flex flex-col  m-0 items-center rounded-md border-slate-300 border-solid border-2 text-slate-300 p-12">
//                     <h2 className="font-bold mb-5 text-3xl">Create Account</h2>
//                     <div className="flex flex-col">
//                         <label htmlFor="name" className="text-sm text-start mb-0">Name</label>
//                         <input id="name" onChange={(e)=>{setName(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
//                         <label htmlFor="email" className="text-sm text-start mt-3 mb-0">Email</label>
//                         <input id="email" onChange={(e)=>{setEmail(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
//                         <label htmlFor="password" className="text-sm text-start mt-3 mb-0">Password</label>
//                         <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}} required className="flex items-center w-full px-3 py-2 mr-2 text-sm font-medium outline-none text-slate-800 focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"/>
//                         <input type="submit" id="registerSubmitButton" value="Create Account" className="bg-slate-500 w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-purple-blue-600 focus:ring-4 focus:ring-purple-blue-100 bg-purple-blue-500" />
//                         <input type="button" id="linkToLogin" value='Already registered? Sign In' onClick={()=> navigate("/login")} className="underline underline-offset-1"/>
//                     </div>
//                 </div>
//             </form>
//         </div>
//         </>
//     )
// }

// export default Register;