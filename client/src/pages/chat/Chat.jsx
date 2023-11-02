import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import './chat.css'

export default function Chat() {
  return (
	<div className='chat'>
		<div className="chatMenu">
			<div className="chatMenuWrapper">
				<input placeholder='Search for People' className='chatMenuInput' />
				<Conversation />
				<Conversation />
				<Conversation />
				<Conversation />
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
