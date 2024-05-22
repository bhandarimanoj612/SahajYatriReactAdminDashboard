import React, { useEffect, useState } from "react";
// import ChatPage from "../Chat/ChatPage";
import BookingList from "../Book/BookingList"; // Import BookingList component
import DashboardPage from "../DashBoard/DashboardPage";
import Role from "../Role/Role";
import NavBar from "../../Component/NavBar";
import HotelList from "./HotelList";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Offer from "./Offer";
import SafteyRule from "./SafteyRule";

const Home = () => {
  const [activeItem, setActiveItem] = useState(null);

  const { user, setUser } = useAuth();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (!userData) {
          // If no user data found, navigate back to the login page
          navigate("/");
        } else {
          // If user data found, set the user in the context
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    };

    checkLoggedIn(); // Call the function immediately on mount
  }, [navigate, setUser]); // Ensure useEffect runs whenever navigate or setUser changes

  if (!user) {
    // If user is not logged in, do not render anything until authentication is checked
    return null;
  }
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleViewDetails = (booking) => {
    // Function to handle view details of booking
    console.log("View details of booking", booking);
  };

  const renderPage = () => {
    switch (activeItem) {
      case "Offer":
        return <Offer />;
      case "Orders":
        return <BookingList handleViewDetails={handleViewDetails} />; // Pass handleViewDetails function to BookingList
      case "Dashboard":
        return <DashboardPage />;
      case "Role":
        return <Role />;
      case "Saftey":
        return <SafteyRule />;
      case "Hotels":
      default:
        return <HotelList />;
    }
  };

  return (
    <div className="flex flex-row h-screen">
      <NavBar handleItemClick={handleItemClick} />
      <div className="flex flex-grow">{renderPage()}</div>
    </div>
  );
};

export default Home;
