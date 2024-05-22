// import React, { useState, useEffect } from "react";
// import randomImage from "../../data/randomImage";

// const UserList = ({ selectUser }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(
//         "https://localhost:7246/api/Message/usernames"
//       );
//       if (response.ok) {
//         const data = await response.json();
//         // Map fetched user data to the required format
//         const formattedUsers = data.map((username, index) => ({
//           id: index + 1, // Generate unique ID for each user
//           name: username,
//           image: randomImage(), // Get a random image for each user
//         }));
//         setUsers(formattedUsers);
//       } else {
//         console.error("Failed to fetch user data:", response.status);
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   return (
//     <div className="relative bg-blue-200 text-white mt-7 ml-5 w-1/5 rounded-2xl p-5">
//       <h2 className="text-2xl font-bold mb-4">Users</h2>
//       <ul className="space-y-2">
//         {users.map((user) => (
//           <li
//             key={user.id}
//             className="p-2 rounded hover:bg-red-400 cursor-pointer"
//             onClick={() => selectUser(user)}
//           >
//             <div className="flex items-center space-x-2">
//               <img
//                 src={user.image}
//                 alt={user.name}
//                 className="w-10 h-10 rounded-full"
//               />
//               <p className="">{user.name}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <button className="bg-blue-900 rounded-xl p-4 pr-16 absolute bottom-5 left-5">
//         Global
//       </button>
//     </div>
//   );
// };

// export default UserList;
