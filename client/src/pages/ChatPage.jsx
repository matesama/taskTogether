import Navigation from '../components/Navigation';
import ChatMenu from '../components/ChatMenu';
import ChatBox from '../components/ChatBox';



const ChatPage = () => {

  return (
    <>
      <div key='container' className='dashboard'>
        <div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
          <Navigation />
        </div>
        <div key='chatmenu' className="chatMenu bg-slate-500 text-slate-950 max-sm:w-full">
          <ChatMenu />
        </div>
        <div className="contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5">
          <div className="flex flex-col h-full justify-center">
            <ChatBox />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatPage;
