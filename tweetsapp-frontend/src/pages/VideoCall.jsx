import { useNavigate } from "react-router-dom";

const VideoCall = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">🔴 Live Video Call</h2>
      <div className="w-full max-w-4xl h-96 border-4 border-purple-400 bg-black rounded-xl shadow-lg flex items-center justify-center text-white">
        [Simulated Video Stream]
      </div>
      <button
        onClick={() => navigate("/messages")}
        className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCall;
