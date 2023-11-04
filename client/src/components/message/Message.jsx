import "./message.css"
import { format } from "../../utils/fomat"
import { useEffect, useState } from "react"
import axios from 'axios';



export default function Message({message, own}) {

	const [sender, setSender] = useState(null);

	useEffect(() => {

		const getSender = async () => {
		  try {
			const res = await axios(`http://localhost:8000/api/users?userId=${message.sender}`);
			setSender(res.data);
		  } catch (err) {
			console.log(err);
		  }
		};

		getSender();
	}, [message.sender]);

  	return (
		<div className={own ? "message own" : "message"}>
			<div className="messageTop">
				<img
					className="messageImg"
					src={sender?.profilePicture ? sender.profilePicture : "https://i.pinimg.com/474x/ed/da/d1/eddad14d545a4a36f9ac75bef266be30.jpg"}
					alt="" />
				<p className="messageText">
					{message.text}
				</p>
			</div>
			<div className="messageBottom">{format(message.createdAt)}</div>
		</div>
  	)
}
