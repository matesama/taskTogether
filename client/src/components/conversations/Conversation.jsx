import { useEffect, useState } from "react"
import "./conversation.css"

export default function Conversation({conversation}) {
	// const [user, setUser] = useState(null);

	// useEffect(() => {
	// 	const contactId = conversation.member.find
	// }, [])


  return (
	<div className="conversation">
		<img className="conversationImg" src="http://tcap.pbworks.com/f/1435170280/myAvatar.png" alt="" />
		<span className="conversationName">John Doe</span>
	</div>
  )
}
