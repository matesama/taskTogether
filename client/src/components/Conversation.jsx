import { useEffect, useState } from "react"
import "./conversation.css"
import axios from 'axios';


export default function Conversation({conversation, currentUser}) {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const contactId = conversation.members.find((m) => m !== currentUser._id);

		const getUser = async () => {
			try {
				const res = await axios(`http://localhost:8000/api/users?userId=${contactId}`);
				setUser(res.data);
			} catch(err) {
				console.log(err);
			}
		}
		getUser();
	}, [currentUser, conversation]);


  return (
	<div className="conversation max-sm:w-full">
		<img
			className="conversationImg"
			src={
				user?.profilePicture
            	? user.profilePicture
            	: "https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg"
			}
			alt=""
		/>
		<span className="conversationName">{user?.username}</span>
	</div>
  )
}
