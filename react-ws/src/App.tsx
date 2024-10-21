import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws:localhost:8080");
    newSocket.onopen = () => {
      console.log("connected");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      console.log("Message Recieved", message.data);
      setLatestMessage(message.data);
    };
    return () => {
      newSocket.close();
    };
  }, []);

  if (!socket) {
    return (
      <div className="flex justify-center items-center h-screen w-full bg-black text-white font-semibold text-lg">
        Connecting to web-socket server...
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full bg-black text-white">
      <div className="flex flex-col items-center justify-center p-4 gap-y-2">
        <div className="flex justify-between space-x-2 ">
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            className="border rounded-lg py-2 px-1"
          />
          <button
            onClick={() => socket.send(message)}
            className="font-bold text-xl"
          >
            send
          </button>
        </div>
        {latestMessage}
      </div>
    </div>
  );
}

export default App;
