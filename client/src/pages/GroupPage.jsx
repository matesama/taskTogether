import './dashboard.css'
import ChatMenu from '../components/ChatMenu.jsx';
import Navigation from '../components/Navigation.jsx';
import GroupComponent from '../components/GroupComponent';
import  {useContext} from 'react';
import { AddContext } from '../context/AddContext.jsx';

const AddPage = () => {
	//Mobile View
	const {visibleMobile} = useContext(AddContext);
	const chatMenuSizeClass = 'max-sm:w-0 max-sm:h-0 max-sm:invisible chatMenu bg-slate-500 text-slate-950';
	const groupSizeClass = 'max-sm:w-full max-sm:h-full contentContainer bg-slate-300'
	// console.log(visibleMobile);


	 return (
		<>
		  <div key="container" className='dashboard'>
		 	<div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
			  <Navigation />
			</div>
			<div key="chatMenu" className={visibleMobile ? chatMenuSizeClass : "chatMenu bg-slate-500 text-slate-950 max-sm:w-full"}>
			  <ChatMenu />
			</div>
			<div className={visibleMobile ? groupSizeClass :"contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5"}>
				<div className="flex flex-col h-full justify-center">
				<GroupComponent />
              	</div>
		 	</div>
		  </div>
	  </>
	)
  }

  export default AddPage;

