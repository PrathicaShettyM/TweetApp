import { Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import VideoCall from "./pages/VideoCall";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Sidebar />}>
        <Route path="/explore" element={<Explore />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
