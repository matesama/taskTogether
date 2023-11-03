import './App.css'
import Chat from './pages/chat/Chat'
// import { AuthContextProvider } from "./context/AuthContext";

function App() {


  return (
    <>
    <h1 className='text-x1 font-bold'>Hello taskTogether</h1>
    {/* <AuthContextProvider> */}
      <Chat />
    {/* </AuthContextProvider> */}
    </>
  )
}

export default App
