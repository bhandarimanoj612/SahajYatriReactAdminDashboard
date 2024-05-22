// BookingList.js
import React, { useEffect, useState } from "react";
import AddBookDetails from "../../Component/AddBookDetails";
import axios from "axios"; // Import Axios for making HTTP requests
import { useAuth } from "../Context/AuthContext";

function BookingList({ handleViewDetails }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isAddDetailsOpen, setIsAddDetailsOpen] = useState(false); // State for add details popup
  const [bookings, setBookings] = useState([]); // State to store booking data

  const { user } = useAuth();
  const userEmail = user ? user.email : "";

  useEffect(() => {
    // Fetch booking data when the component mounts
    async function fetchBookings() {
      try {
        const response = await axios.get(
          `https://localhost:7246/api/Booking/user/admin/${userEmail}` // Change the URL to your backend endpoint
        );
        const { hotelBookings, travelBookings, vehicleBookings } =
          response.data;

        // Combine hotels, travels, and vehicles into a single array
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
  }, []); // Empty dependency array ensures useEffect runs only once

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setIsDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setSelectedBooking(null);
    setIsDetailsOpen(false);
  };

  const openAddDetailsModal = (booking) => {
    setSelectedBooking(booking); // Set the selected booking
    setIsAddDetailsOpen(true);
  };

  const closeAddDetailsModal = () => {
    setIsAddDetailsOpen(false);
  };

  const handleAddDetails = () => {
    // Handle adding details here
    console.log("Adding booking details...");
    closeAddDetailsModal(); // Close the add details modal after adding details
  };

  return (
    <div className="container mx-auto mt-16 ml-5 pr-5">
      <h2 className="text-lg font-semibold mb-4 bg-gray-100 rounded-lg shadow-md p-4">
        Booking Details
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full rounded-full">
          {/* <table> */}
          <thead className="font-mono text-md mb-4 bg-gray-100 rounded-lg shadow-md  w-full">
            {/* <tr className="bg-gray-100"> */}
            <tr className=" font-semibold mb-8 bg-gray-100 rounded-lg shadow-md p-4  border-dark-800">
              {/* <th className="border px-4 py-2">ID</th> */}
              <th className="border px-4 py-2">User Name</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Number of Guests</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Price Per Day</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="text-center">
                {/* <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.id}
                </td> */}
                <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.userName}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.startDate}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.endDate}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.numberOfGuests}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  ${booking.totalPrice}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  ${booking.pricePerDay}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.status}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  {booking.name}
                </td>
                <td className="border px-4 py-2 font-extralight text-sm">
                  {/* Use onClick to open the details modal */}
                  <button
                    className="bg-[#2A3288] text-white px-2 py-1 rounded mx-1 m-3 hover:bg-blue-800"
                    onClick={() => openAddDetailsModal(booking)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Render the AddBookDetails component as a modal only if a booking is selected */}
      {selectedBooking && isAddDetailsOpen && (
        <AddBookDetails
          booking={selectedBooking}
          handleBack={closeAddDetailsModal}
          handleAddDetails={handleAddDetails}
        />
      )}
    </div>
  );
}

export default BookingList;
