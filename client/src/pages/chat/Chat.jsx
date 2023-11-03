import './chat.css'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
// import { AuthContext} from '../../context/AuthContext'

// const { user } = useContext(AuthContext);

// console.log(user)



export default function Chat() {
	const [conversation, setConversations] = useState([]);
	// const {user} = useContext(AuthContext);

	useEffect(() => {
		const getConversations = async () => {
			try {
				const res = await axios.get("http://localhost:8000/api/conversations/654401ef6a02e04b0eea2bc4");
				setConversations(res.data);
				// TODO: Use useContext to get the current user._id but it has to be implemented from the login on
				// const res = await axios.get("/conversations/ = user._id")
			} catch (err){
				console.log(err);
			}
		};

		// You need to call the function you defined to actually make the request
		getConversations();

	}, []);

  return (
	<div className='chat'>
		<div className="chatMenu">
			<div className="chatMenuWrapper">
				<input placeholder='Search for People' className='chatMenuInput' />
				{conversation.map(c => (
					<Conversation conversation={c} />
					// <Conversation conversation={c} currentUser={user} />
				))}
				{/* <Conversation />
				<Conversation />
				<Conversation />
				<Conversation /> */}
			</div>
		</div>
		<div className="chatBox">
			<div className="chatBoxWrapper">
				<div className="chatBoxTop">
					<Message />
					<Message own={true} />
					<Message />
					<Message />
				</div>
				<div className="chatBoxBottom">
					<textarea className='chatMessageInput' placeholder='write something..'></textarea>
					<button className='chatSubmitButton'>Send</button>
				</div>
			</div>
		</div>
	</div>
  )
}
