import { useContext, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navgiation';
import ChatMenu from '../components/ChatMenu';
import ChatBox from '../components/ChatBox';
import { useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const ChatPage = () => {
  const navigate = useNavigate();
    const { id } = useParams();
	const {user, token} = useContext(UserContext);


  const { currentChat, setCurrentChat, allUsers, socket, conversations, getConversations } = useContext(ChatContext);

  const handleAddButtonClick = () => {
    setCurrentChat(null);
  };

  const handleChatClick = (chat) => {
    navigate(`/chat/${chat._id}`);
  };

  useEffect(() => {
    const getChat = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/conversations/find/${id}`);
        setCurrentChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getChat();
  }, [id, setCurrentChat]);

  useEffect(() => {
    getConversations({ _id: id }); // replace with the actual user object
  }, [id, getConversations]);

  return (
    <>
      <div key='dashboard' className='dashboard'>
        <div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
          <Navigation onAddButtonClick={handleAddButtonClick} socket={socket} />
        </div>
        <div key='chatmenu' className="chatMenu bg-slate-500 text-slate-950 max-sm:w-full">
          <ChatMenu setCurrentChat={handleChatClick} conversations={conversations} onAddButtonClick={handleAddButtonClick}/>
        </div>
        <div className="contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5">
          <ChatBox
            currentChat={currentChat}
            socket={socket}
            allUsers={allUsers}/>
        </div>
      </div>
    </>
  )
}

export default ChatPage;


// import './dashboard.css'
// import Navigation from '../components/Navgiation'
// import ChatMenu from '../components/ChatMenu'
// import ChatBox from '../components/ChatBox'
// import { useContext, useState, useRef, useEffect } from 'react'
// import { AuthContext } from '../context/AuthContext';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { ChatContext } from '../context/ChatContext';
// import { useNavigate } from 'react-router-dom';



// const ChatPage = () => {
//     const { currentChat, setCurrentChat, allUsers, setAllUsers, socket } = useContext(ChatContext);
//     // const [currentChat, setCurrentChat] = useState(null);
//     const [conversations, setConversations] = useState([]);
//     const {user} = useContext(AuthContext);
// 	const { id } = useParams();
// 	// const { socket, allUsers } = useContext(ChatContext);
//     const navigate = useNavigate();

//     useEffect(() => {
//         getConversations();
//       }, []);

//     // const getConversations = async () => {
//     //     try {
//     //         const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
//     //         setConversations(res.data);
//     //     } catch (err){
//     //         console.log(err);
//     //     } finally {
//     //       //loader
//     //     }
//     // };

//     useEffect(() => {
//         if (socket.current) {
//             socket.current.on('newConversation', getConversations);
//         }

//         return () => {
//             if (socket.current) {
//                 socket.current.off('newConversation');
//             }
//         };
//     }, [getConversations]);

//     useEffect(() => {
//         getConversations();
//     }, [user._id]);

//     const handleAddButtonClick = () => {
//         setShowAddComponent(true);
//         setshowGroupComponent(false);
//         setCurrentChat(null);
//     };

//     const handleChatClick = (chat) => {
//         navigate(`/chat/${chat._id}`);
//     };

//     useEffect(() => {
//         const getChat = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:8000/api/conversations/find/${id}`);
//                 setCurrentChat(res.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         };

//         getChat();
//     }, [id]);

//     return (
//         <>
//             <div key='dashboard' className='dashboard'>
//                 <div className="navigation bg-slate-800 max-sm:invisible sm:w-24 max-sm:w-0">
//                     <Navigation onAddButtonClick={handleAddButtonClick} socket={socket} />
//                 </div>
//                 <div key='chatmenu' className="chatMenu bg-slate-500 text-slate-950 max-sm:w-full">
//                     <ChatMenu setCurrentChat={handleChatClick} conversations={conversations} onAddButtonClick={handleAddButtonClick}/>
//                 </div>
//                 <div className="contentContainer bg-slate-300 max-sm:w-0 max-sm:invisible sm:flex-5.5">
//                     <ChatBox
//                         currentChat={currentChat}
//                         socket={socket}
//                         allUsers={allUsers}/>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default ChatPage;