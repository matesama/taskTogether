import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return(
        <footer className="bg-slate-300 rounded-lg shadow flex w-full mx-auto  p-4 justify-between">
        <div>
            <span className="text-sm text-slate-950 sm:text-center dark:text-gray-400">© 2023 </span><button onClick={navigate("/homepage")} className="hover:underline">taskTogether™</button><span> All Rights Reserved.</span>
        </div>
    <div></div>
    <ul className="flex text-sm font-medium text-slate-950 dark:text-gray-400 mt-0 ">
        <li>
            <button href="#" className="hover:text-slate-500 me-4 md:me-6 underline" onClick={()=>navigate("/login")}>Sign In</button>
        </li>
        <li>
            <button href="#" className="hover:text-slate-500 underline" onClick={()=>navigate("/register")}>Create Account</button>
        </li>
    </ul>
</footer>

    )
}
export default Footer;