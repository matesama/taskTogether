const Footer = () => {

    return(
        <footer class="bg-slate-200 rounded-lg shadow">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-slate-950 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">taskTogether™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-slate-950 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" class="hover:underline me-4 md:me-6">Sign In</a>
        </li>
        <li>
            <a href="#" class="hover:underline">Create Account</a>
        </li>
    </ul>
    </div>
</footer>

    )
}
export default Footer;