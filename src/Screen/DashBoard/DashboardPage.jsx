import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faDollarSign,
  faHotel,
} from "@fortawesome/free-solid-svg-icons";
import { IoBarChartOutline } from "react-icons/io5";
import axios from "axios";
import "chart.js/auto";
import { useAuth } from "../Context/AuthContext";

const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);

  const { user } = useAuth();
  const userEmail = user ? user.email : "";

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    async function fetchBookings() {
      try {
        const response = await axios.get(
          `https://localhost:7246/api/Booking/user/admin/${userEmail}`
        );
        // Extract data from the response
        const { hotelBookings, travelBookings, vehicleBookings } =
          response.data;

        // Combine hotel, travel, and vehicle bookings into a single array
        const allBookings = [
          ...hotelBookings,
          ...travelBookings,
          ...vehicleBookings,
        ];
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  // Calculate total number of users
  const totalUsers = bookings.length;

  // Calculate total income
  const totalIncome = bookings.reduce(
    (acc, booking) => acc + booking.totalPrice,
    0
  );

  // Calculate total number of bookings
  const totalBookings = bookings.length;

  // Function to calculate the status distribution of bookings
  const getStatusDistribution = () => {
    const statusCount = {};
    bookings.forEach((booking) => {
      statusCount[booking.status] = (statusCount[booking.status] || 0) + 1;
    });
    return statusCount;
  };

  // Data for the pie chart
  const data = {
    labels: Object.keys(getStatusDistribution()),
    datasets: [
      {
        data: Object.values(getStatusDistribution()),
        backgroundColor: ["#4299E1", "#ED8936", "#48BB78"], // Colors for each status
        hoverBackgroundColor: ["#2B6CB0", "#C05621", "#2F855A"],
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 w-full">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <IoBarChartOutline className="mr-2 text-[#2B3384]" /> Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUsers}
                  className="text-[#2B3384] mr-2"
                />
                <h2 className="text-lg font-semibold">Total Users</h2>
              </div>
              <span className="text-2xl font-bold text-[#2B3384]">
                {totalUsers}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faDollarSign}
                  className="text-green-500 mr-2"
                />
                <h2 className="text-lg font-semibold">Total Income</h2>
              </div>
              <span className="text-2xl font-bold text-green-500">
                ${totalIncome.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faHotel}
                  className="text-yellow-500 mr-2"
                />
                <h2 className="text-lg font-semibold">Bookings Number</h2>
              </div>
              <span className="text-2xl font-bold text-yellow-500">
                {totalBookings}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 bg-white rounded-lg shadow-md p-4">
            Booking Status Distribution
          </h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            <Pie
              data={data}
              options={{ maintainAspectRatio: false, responsive: true }}
              height={250}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
