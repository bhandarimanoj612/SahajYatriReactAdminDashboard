import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Role = () => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://localhost:7246/api/Auth/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAssignRole = async (id) => {
    try {
      const response = await axios.post(
        "https://localhost:7246/api/Auth/assign-role",
        {
          userName: users.find((user) => user.userId === id).username,
          role: newRole,
          assignRole: true,
        }
      );
      console.log(response.data);
      fetchUsers();
      toast.success("Role assigned successfully");
    } catch (error) {
      console.error("Error assigning role:", error);
      toast.error("Failed to assign role");
    }
  };

  const handleSaveName = async (id, newName) => {
    try {
      const response = await axios.post(
        "https://localhost:7246/api/Auth/change-username",
        {
          currentUsername: users.find((user) => user.userId === id).username,
          newUsername: newName,
        }
      );
      console.log(response.data);
      fetchUsers();
      toast.success("Username changed successfully");
    } catch (error) {
      console.error("Error saving name:", error);
      toast.error("Failed to change username");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:7246/api/Auth/delete-user/${id}`
      );
      console.log(response.data);
      fetchUsers();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold  bg-gray-100 rounded-lg shadow-md p-4 mb-14 mt-4">
        Assign Role
      </h2>

      {/* <table className="font-mono text-sm mb-4 bg-gray-100 rounded-lg shadow-md  w-full">
        <thead>
          <tr className="text-lg font-semibold mb-8 bg-white rounded-lg shadow-md p-4  border-dark-800"> */}

      <table className="table-auto w-full">
        <thead className="font-mono text-md mb-4 bg-gray-100 rounded-lg shadow-md  w-full">
          {/* <tr className="bg-gray-100 p-2"> */}
          <tr className="font-mono font-semibold mb-8 bg-gray-100 rounded-lg shadow-md p-4  border-dark-800">
            {/* <th className="px-2 py-1">Id</th> */}
            <th className="px-2 py-1">User</th>
            <th className="px-2 py-1">Role</th>
            <th className="px-2 py-1">Assign Role</th>
            <th className="px-2 py-1">Change Name</th>
            <th className="px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId} className="border-b">
              {/* <td className="px-2 py-1">{user.userId}</td> */}
              <td className="px-2 py-1">{user.username}</td>
              <td className="px-2 py-1">{user.role}</td>
              <td className="px-2 py-1">
                <select
                  className="border p-1 mr-1"
                  defaultValue=""
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option value="" disabled>
                    Assign Role
                  </option>
                  <option value="hotel">Hotel</option>
                  <option value="vehicle">Vehicle</option>
                  <option value="travel">Travel</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  className="bg-blue-800 text-white px-2 py-1 rounded hover:bg-blue-900"
                  onClick={() => handleAssignRole(user.userId)}
                >
                  Assign
                </button>
              </td>
              <td className="px-2 py-1">
                <input
                  type="text"
                  defaultValue={user.username}
                  className="border p-1 mr-1"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button
                  className="bg-blue-800 text-white px-2 py-1 rounded hover:bg-blue-900"
                  onClick={() => handleSaveName(user.userId, newUsername)}
                >
                  Save
                </button>
              </td>
              <td className="px-2 py-1">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDeleteUser(user.userId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Role;
