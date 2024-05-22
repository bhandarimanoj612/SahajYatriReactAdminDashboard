import React, { useState } from "react";
import { PiWindowsLogo } from "react-icons/pi";
import { BsChatLeft } from "react-icons/bs";
// import { FiMoreVertical } from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { ChevronLast, ChevronFirst } from "lucide-react";
import { CiBookmarkPlus } from "react-icons/ci";
import { FiMoreVertical, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Screen/Context/AuthContext";
import {
  BiBookContent,
  BiBookReader,
  BiRuler,
  BiShield,
  BiShieldAlt,
  BiSolidNote,
  BiSolidOffer,
  BiSolidShieldAlt2,
} from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavBar = ({ handleItemClick }) => {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { user } = useAuth();

  const [expanded, setExpanded] = useState(true);
  // Define a state to keep track of the active item
  const [activeItem, setActiveItem] = React.useState(null);

  // Function to handle click on navigation items

  const handleLogout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem("userData");
      await AsyncStorage.removeItem("userName");
      // Navigate back to the login page
      navigate("/");
      toast.success("Logout successfully");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Logout Fail");
    }
  };
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-[#2A3288] border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="logo/img4.png"
            alt="logo"
            className={` mt-10 overflow-hidden transition-all ${
              expanded ? "w-36" : "w-0"
            }`}
          />
          <button
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-500"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <ul className="flex-1 px-3 mt-28">
          <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              activeItem === "Add"
                ? "bg-red-to-tr from-grey-200 to-red-100 text-[#CB0A31]"
                : "hover:bg-red-600 text-white"
            }`}
            onClick={() => handleItemClick("Add")}
          >
            <PiWindowsLogo />
            <span
              className={` overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              Home
            </span>
          </li>

          <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              activeItem === "Orders"
                ? "bg-gradient-to-tr from-grey-200 to-indigo-100 text-[#CB0A31]"
                : "hover:bg-red-600 text-white"
            }`}
            onClick={() => handleItemClick("Orders")}
          >
            <CiBookmarkPlus />
            <span
              className={` overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              Booking
            </span>
          </li>
          <li
            className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
              activeItem === "Dashboard"
                ? "bg-gradient-to-tr from-grey-200 to-red-100 text-[#CB0A31]"
                : "hover:bg-red-600 text-white"
            }`}
            onClick={() => handleItemClick("Dashboard")}
          >
            <IoBarChartOutline />
            <span
              className={` overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              Dashboard
            </span>
          </li>
          {user &&
            user.role === "Admin" && ( // Check if user is logged in and has admin role
              <li
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                  activeItem === "User"
                    ? "bg-gradient-to-tr from-grey-200 to-red-100 text-[#CB0A31]"
                    : "hover:bg-red-600 text-white"
                }`}
                onClick={() => handleItemClick("Offer")}
              >
                <BiSolidOffer />
                <span
                  className={` overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  Offers
                </span>
              </li>
            )}
          {user &&
            user.role === "Admin" && ( // Check if user is logged in and has admin role
              <li
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                  activeItem === "User"
                    ? "bg-gradient-to-tr from-grey-200 to-red-100 text-[#CB0A31]"
                    : "hover:bg-red-600 text-white"
                }`}
                onClick={() => handleItemClick("Role")}
              >
                <CiUser />
                <span
                  className={` overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  Role
                </span>
              </li>
            )}
          {user &&
            user.role === "Admin" && ( // Check if user is logged in and has admin role
              <li
                className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
                  activeItem === "User"
                    ? "bg-gradient-to-tr from-grey-200 to-red-100 text-[#CB0A31]"
                    : "hover:bg-red-600 text-white"
                }`}
                onClick={() => handleItemClick("Saftey")}
              >
                <BiBookReader />
                <span
                  className={` overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  Saftey Rules
                </span>
              </li>
            )}
        </ul>

        <div className="border-t flex p-5">
          <img
            src="logo/img2.png"
            alt="logo"
            className="w-10 h-10 rounded-md"
          />

          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div>
              <h4 className="font-semibold text-white">
                {user ? user.name : "Guest"}
              </h4>
              <span className="text-xs text-white">
                {user ? user.email : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="pb-8">
          <button
            className="flex items-center justify-center text-white hover:bg-red-700 px-6 py-3 w-full rounded-lg"
            onClick={handleLogout}
          >
            <a
              className={`
                          flex justify-between items-center
                          overflow-hidden transition-all ${
                            expanded ? "ml-3" : "w-0"
                          }
                      `}
            >
              Logout
            </a>

            <FiLogOut
              size={20}
              className={`
            flex justify-between items-center
            overflow-hidden transition-all ml-3
        `}
            />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default NavBar;
