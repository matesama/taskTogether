import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return(
        <footer className="bg-slate-300 rounded-lg shadow">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-slate-950 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">taskTogether™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-slate-950 dark:text-gray-400 sm:mt-0">
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