import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Login from "./Login";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState(""); // Define email state
  const [password, setPassword] = useState(""); // Define password state

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        // If user data exists in AsyncStorage, navigate to the home page
        navigate("/home");
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email.trim() && !password.trim()) {
        // Display error message if both username and password are empty
        toast.error("Username and Password cannot be empty.");
        return;
      }
      if (!email.trim()) {
        // Display error message if username is empty
        toast.error("Username cannot be empty.");
        return;
      }
      if (!password.trim()) {
        // Display error message if password is empty
        toast.error("Password cannot be empty.");
        return;
      }

      const response = await axios.post(
        "https://localhost:7246/api/Auth/login",
        {
          userName: email, // You're sending the email as the username
          password: password,
        }
      );

      const userData = response.data; // Assuming your response contains user data like username and token
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      await AsyncStorage.setItem("userName", email); // Save the username separately
      console.log("user data are", userData);

      console.log(response.data); // Check response data in the console
      // If login is successful, navigate to the home page
      navigate("/home");
      // Display success message
      toast.success("Login successful!");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        // Display error message if password is incorrect
        toast.error("Incorrect username or password.");
      } else {
        // Display generic error message for other errors
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#2A3288]">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-96 h-1">
        <img src="logo/img1.png" alt="logo" className="w-96 ml-10" />
      </div>
      <div className="w-full max-w-xs">
        <img src="logo/img4.png" alt="logo" className="w-96 h-40 ml-6" />
        <div className="w-96 bg-white rounded-3xl h-auto ">
          {/* {isLogin ? ( */}
          <Login
            handleLogin={handleLogin}
            handleToggle={handleToggle}
            email={email} // Pass email state as prop
            password={password} // Pass password state as prop
            setEmail={setEmail} // Pass setEmail function as prop
            setPassword={setPassword} // Pass setPassword function as prop
          />
        </div>
      </div>
      <div className="absolute right-2 w-80 h-10 mr-16">
        <img src="logo/img2.png" alt="magnifing glass" />
      </div>
      <div className="absolute right-3  transform -translate-y-1/2 w-50 h-80 ">
        <img src="logo/img3.png" alt="sahaj yatri" />
      </div>
    </div>
  );
};

export default Auth;
