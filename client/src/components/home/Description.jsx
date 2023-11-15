import description from "./img/description.png"

const Description = () => {

    return(
        <div className="bg-slate-800">
            <h2 className="text-5xl text-slate-200 py-5">What is our mission?</h2>
            <section className="flex justify-around items-center">
                <img className="h-auto max-w-lg rounded-full object-contain" src={description} alt="image description" />
                <div className=" px-10 text-2xl">
                    <ul className="space-y-4 text-left text-slate-200">
                        <li className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            <span>Allows users to set and share their daily goals, making it easy to prioritize tasks and work towards meaningful objectives</span>
                        </li>
                        <li className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            <span>Promote accountability, where members check and support each other's progress and create more time for every individual</span>
                        </li>
                        <li className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            <span>Help users meet their deadlines by focusing their efforts on their top daily goals</span>
                        </li>
                        <li className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            <span>Provide a daily structure by setting and tracking specific goals, helping users stay on track</span>
                        </li>
                        <li className="flex items-center space-x-3 rtl:space-x-reverse">
                            <svg className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg>
                            <span>Provide a platform for users to share their challenges, receive feedback, and celebrate their successes</span>
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
export default Description;
