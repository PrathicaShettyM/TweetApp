import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dummyMessages = [
  { id: 1, sender: "Alice", text: "Hey, you free to talk?" },
  { id: 2, sender: "You", text: "Sure, wanna hop on a call?" },
];

const Messages = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  const handleVideoCall = () => {
    navigate("/video-call");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Messages</h2>
      <div className="space-y-2 h-64 overflow-y-scroll border p-4 rounded bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex items-center mt-4 space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded p-2"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
        <button
          onClick={handleVideoCall}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Video Call
        </button>
      </div>
    </div>
  );
};

export default Messages;
