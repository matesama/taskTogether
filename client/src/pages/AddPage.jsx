import './dashboard.css'
import ChatMenu from '../components/ChatMenu.jsx';
import Navigation from '../components/Navigation.jsx';
import AddComponent from '../components/AddComponent';
import { useContext } from 'react';
import { NavigationContext } from '../context/NavigationContext';

const AddPage = () => {
const {visibleMobile} = useContext(NavigationContext);
	const chatMenuSizeClass = 'max-sm:w-0 max-sm:h-0 max-sm:invisible chatMenu bg-slate-500 text-slate-950';
  const addComponentSizeClass = 'max-sm:w-full max-sm:h-full contentContainer bg-slate-300'
	console.log(visibleMobile);

	 return (
		<>
		  <div key="container" className='dashboard'>
		 	<div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
			  <Navigation />
			</div>
			<div key="chatMenu" className={visibleMobile ? chatMenuSizeClass :"chatMenu bg-slate-500 text-slate-950 max-sm:w-full"}>
			  <ChatMenu />
			</div>
			<div className={visibleMobile ? addComponentSizeClass : "contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5"}>
				<div className="flex flex-col h-full justify-center">
					<AddComponent />
              	</div>
		 	</div>
		  </div>
	  </>
	)
  }

  export default AddPage;
