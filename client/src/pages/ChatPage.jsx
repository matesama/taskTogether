import Navigation from '../components/Navigation';
import ChatMenu from '../components/ChatMenu';
import ChatBox from '../components/ChatBox';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ChatMenuContext } from '../context/ChatMenuContext';


const ChatPage = () => {
  const navigate = useNavigate();
  
	//Mobile View
  const {visibleMobile} = useContext(ChatMenuContext);
	const chatMenuSizeClass = 'max-sm:w-0 max-sm:h-0 max-sm:invisible chatMenu bg-slate-500 text-slate-950';
  const chatSizeClass = 'max-sm:w-full max-sm:h-full contentContainer bg-slate-300'
	console.log(visibleMobile);


  return (
    <>
      <div key='container' className='dashboard'>
        <div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
          <Navigation />
        </div>
        <div key='chatMenu' className={visibleMobile ? chatMenuSizeClass : "chatMenu bg-slate-500 text-slate-950 max-sm:w-full"}>
          <ChatMenu />
        </div>
        <div className={visibleMobile ? chatSizeClass :"contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5"}>
          <div className="flex flex-col h-full justify-center w-full">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage;
