import "./message.css"

export default function Message({own}) {
  return (
	<div className={own ? "message own" : "message"}>
		<div className="messageTop">
			<img
				className="messageImg"
				src="http://tcap.pbworks.com/f/1435170280/myAvatar.png"
				alt="" />
			<p className="messageText">Hello this is a message</p>
		</div>
		<div className="messageBottom">1 hour ago</div>
	</div>
  )
}
