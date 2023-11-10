import { useNavigate } from "react-router-dom";


const Nav = () => {
    const navigate = useNavigate();


    return(
        <nav className="bg-slate-300 border-gray-200 dark:bg-gray-900 h-12">
            <div className=" w-auto flex">
                <div className="flex">
                            <button onClick={()=> navigate("/home")}>
                                <span className="text-2xl font-semibold p-5">taskTogether</span>
                            </button>
                    </div>
                <ul className="flex flex-row font-medium justify-end w-full">
                    <li className="self-center">
                        <a href="#" onClick={()=> navigate("/login")} className=" text-slate-800  hover:text-blue-700 pr-3 underline-offset-1 underline">Sign In</a>
                    </li>
                    <li className="self-center pr-5">
                        <button type="button" onClick={()=> navigate("/register")} className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Create Account</button>
                    </li> 
                </ul>
            </div>
        </nav>
    )
}
export default Nav;