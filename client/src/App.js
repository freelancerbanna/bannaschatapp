import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat, SetAvatar, SignIn, SignUp } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/setavatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
