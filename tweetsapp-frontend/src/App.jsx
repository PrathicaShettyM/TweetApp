import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import VideoCall from "./pages/VideoCall";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import RequireAuth from "./auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/messages" element={<Messages />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/video-call" element={<VideoCall />} />
        
        <Route path="/profile" element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        } />

      </Route>
    </Routes>
  );
}

export default App;
