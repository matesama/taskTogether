import { useNavigate } from "react-router-dom";


const Navi = () => {
    const navigate = useNavigate();


    return(
        <nav className="bg-slate-800 border-gray-200 h-12">
            <div className=" w-auto flex">
                <div className="flex">
                            <button onClick={()=> navigate("/homepage")}>
                                <span className="text-2xl font-semibold p-5 text-slate-200">taskTogether</span>
                            </button>
                    </div>
                <ul className="flex flex-row font-medium justify-end w-full">
                    <li className="self-center">
                        <a href="#" onClick={()=> navigate("/login")} className=" text-slate-300  hover:text-blue-700 pr-3 underline-offset-1 underline">Sign In</a>
                    </li>
                    <li className="self-center pr-5">
                        <button type="button" onClick={()=> navigate("/register")} className="text-slate-500 bg-slate-100 hover:bg-slate-500 hover:text-slate-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Create Account</button>
                    </li> 
                </ul>
            </div>
        </nav>
    )
}
export default Navi;