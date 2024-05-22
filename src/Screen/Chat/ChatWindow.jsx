// import { HubConnectionBuilder } from "@microsoft/signalr";
// import { useEffect, useState } from "react";

// const ChatWindow = ({ selectedUser }) => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);

//   const [connection, setConnection] = useState(null);

//   useEffect(() => {
//     const newConnection = new HubConnectionBuilder()
//       .withUrl("https://localhost:7246/hubs/chat") // Replace URL with your SignalR hub endpoint
//       .withAutomaticReconnect()
//       .build();

//     setConnection(newConnection);
//   }, []);

//   useEffect(() => {
//     if (connection) {
//       connection
//         .start()
//         .then(() => console.log("SignalR Connected"))
//         .catch((err) => console.log("SignalR Connection Error: ", err));

//       connection.on("ReceivedMessage", (receivedMessage) => {
//         console.log("Received message:", receivedMessage);
//         // Handle received message, e.g., update state
//         setMessages([...messages, receivedMessage]);
//       });
//     }
//   }, [connection]);

//   const sendMessage = () => {
//     if (message.trim() === "") return;
//     const newMessage = { text: message, sender: "user" };
//     setMessages([...messages, newMessage]);
//     setMessage("");

//     if (connection) {
//       connection
//         .invoke("SendMessage", message)
//         .catch((err) => console.error("Error invoking SendMessage:", err));
//     }
//   };

//   return (
//     <div className="w-5/6 p-6">
//       <h2 className="text-2xl font-bold mb-4 bg-blue-100 p-4 rounded-xl">
//         Chat with {selectedUser ? selectedUser.name : ""}
//       </h2>
//       <div className="overflow-y-auto h-5/6 ">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`p-4 m-2 rounded-lg ${
//               msg.sender === "user" ? "bg-blue-200" : "bg-gray-200 text-right"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="flex m-4">
//         <input
//           type="text"
//           placeholder="Type a message"
//           className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyPress={(e) => e.key === "Enter" && sendMessage()}
//         />
//         <button
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
