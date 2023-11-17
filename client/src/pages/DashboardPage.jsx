import './dashboard.css'
import ChatMenu from '../components/ChatMenu.jsx';
import Navigation from '../components/Navigation.jsx';


const DashboardPage = () => {

	 return (
		<>
		  <div key="container" className='dashboard'>
		 	 <div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
			  	<Navigation />
			  </div>
			  <div key="chatMenu" className="chatMenu bg-slate-500 text-slate-950 max-sm:w-full">
				  <ChatMenu />
			  </div>
			  <div className="contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5">
			  	<div className="flex flex-col h-full justify-center">
                    <span className="noConversationText text-slate-950 ">
                        Welcome to taskTogether
                    </span>
                    <br/>
                    <span className="text-slate-950  text-3xl">
                        Join a Group/Join a partner and start setting and achieving your goals
                    </span>
                </div>
		  </div>
		  </div>
	  </>
	)
  }

  export default DashboardPage;
