import './chat.css'
import Conversation from '../components/conversations/Conversation'
import Message from '../components/message/Message'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const Chat = () => {
	const [conversation, setConversations] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);
	const {user} = useContext(AuthContext);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("http://localhost:8000/api/conversations/" + user._id);
				setConversations(res.data);
			} catch (err){
				console.log(err);
			} finally {
            	//loader
        }
		};
		getConversations();

	}, [user._id]);

	// console.log(user._id);

	useEffect(() => {
		const getMessages = async () => {
		  try {
			const res = await axios.get("http://localhost:8000/api/messages/" + currentChat?._id);
			console.log("message", res.data);
			setMessages(res.data);
		  } catch (err) {
			console.log(err);
		  }
		};
		getMessages();

	}, [currentChat]);

	//   console.log(currentChat);

  return (
  	<>
		<div className='chat'>
			<div className="chatMenu">
				<div className="chatMenuWrapper">
					<input placeholder='Search for People' className='chatMenuInput' />
					{conversation.map((c) => (
						<div onClick={() => setCurrentChat(c)}>
							<Conversation conversation={c} currentUser={user} />
						</div>
					))}
				</div>
			</div>
			<div className="chatBox">
				<div className="chatBoxWrapper">
				{currentChat ? (
    	          <>
    	            <div className="chatBoxTop">
    	              {messages.map((m) => (
    	                <div>
    	                  <Message message={m} own={m.sender === user._id} />
    	                </div>
    	              ))}
    	            </div>
    	            <div className="chatBoxBottom">
    	              <textarea
    	                className="chatMessageInput"
    	                placeholder="write something..."
    	              ></textarea>
    	              <button className="chatSubmitButton">Send</button>
    	            </div>
    	          </>
					) : (
						<span className="noConversationText">
    	            		Open a conversation to start a chat.
    	          		</span>
    	        )}
				</div>
			</div>
		</div>
	</>
  )
}

export default Chat;
