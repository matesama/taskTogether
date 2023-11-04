import "./message.css"
import { format } from "../../utils/fomat"

export default function Message({message, own}) {
  return (
	<div className={own ? "message own" : "message"}>
		<div className="messageTop">
			<img
				className="messageImg"
				src="http://tcap.pbworks.com/f/1435170280/myAvatar.png"
				alt="" />
			<p className="messageText">
				{message.text}
			</p>
		</div>
		<div className="messageBottom">{format(message.createdAt)}</div>
	</div>
  )
}
