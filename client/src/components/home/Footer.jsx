import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return(
        <footer className="bg-slate-300 rounded-lg shadow">
    <div className=" flex w-full mx-auto max-w-screen-xl p-4 justify-between">
        <div>
            <span className="text-sm text-slate-950 sm:text-center dark:text-gray-400">© 2023 </span><button onClick={navigate("/homepage")} className="hover:underline">taskTogether™</button><span> All Rights Reserved.</span>
        </div>
    <div></div>
    <ul className="flex items-center text-sm font-medium text-slate-950 dark:text-gray-400 mt-0">
        <li>
            <button href="#" className="hover:underline me-4 md:me-6" onClick={()=>navigate("/login")}>Sign In</button>
        </li>
        <li>
            <button href="#" className="hover:underline" onClick={()=>navigate("/register")}>Create Account</button>
        </li>
    </ul>

    </div>
</footer>

    )
}
export default Footer;