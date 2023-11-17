import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import "./conversation.css"
import axios from 'axios';


const Conversation = ({ conversation }) => {

	const {user} = useContext(UserContext);
	const [contact, setContact] = useState(null);
	const [groupImg, setGroupImg] = useState('');

	useEffect(() => {
		const contactId = conversation.members.find((m) => m !== user._id);

		const getContact = async () => {
			try {
				const res = await axios(`http://localhost:8000/api/users?userId=${contactId}`);
				setContact(res.data);
			} catch(err) {
				console.log(err);
			}
		}
		getContact();
		setGroupImg(`data:image/jpeg;base64,${conversation.groupPicture}`);
	}, [user, conversation]);

	

  return (
	<div className="conversation max-sm:w-full">
		<img
			className="conversationImg"
			src={
				conversation.groupName
     			 ? (conversation.groupPicture ? {groupImg} : "https://user-images.githubusercontent.com/1468166/37978116-46efb0e0-31b3-11e8-8d51-8d7af47d6f1c.png")
     			 : (contact?.profilePicture ? contact.profilePicture : "https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg")
			}
			alt=""
		/>

		<span className="conversationName">{conversation.groupName ? conversation.groupName : contact?.username}</span>
	</div>
  )
}
export default Conversation;
