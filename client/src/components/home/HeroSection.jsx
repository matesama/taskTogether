import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
    return(
        <section className="bg-center bg-no-repeat bg-hero bg-contain bg-gray-700 bg-blend-multiply">
            <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-slate-100 md:text-5xl lg:text-6xl">Achieve Daily Goals Together with taskTogether</h1>
                <p className="mb-8 text-lg font-normal text-slate-200 lg:text-xl sm:px-16 lg:px-48">
                    taskTogether stands out by promoting effective daily goal management, fostering collaboration, and empowering users to achieve more by working together toward their objectives.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <button onClick={() => navigate("/register")} className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-slate-500 rounded-lg bg-white hover:bg-slate-500 hover:text-white focus:ring-4 focus:ring-blue-300">
                        Join Now
                    </button>
                </div>
            </div>
        </section>
    )
}

    export default HeroSection;