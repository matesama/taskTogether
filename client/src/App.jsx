import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import {Routes, Route} from "react-router-dom";

function App() {

  return (
    <>
    <div>
      {/*<h1 className='text-x1 font-bold'>Hello taskTogether</h1>*/}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    </>
  )
}

export default App
