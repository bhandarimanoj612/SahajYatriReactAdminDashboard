import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import AddOfferModal from "../../Component/AddOfferModal";
import AddOfferUpdate from "../../Component/AddOfferUpdate";
import AddOfferRule from "../../Component/AddOfferRule";
import AddRuleUpdate from "../../Component/AddRuleUpdate";

function SafteyRule() {
  const [hotels, setHotels] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [hotelToUpdate, setHotelToUpdate] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // Add state for update modal
  const { user } = useAuth();
  const userEmail = user ? user.email : "";

  useEffect(() => {
    fetchHotels(); // Fetch hotels on component mount

    // Set interval to fetch hotels every 10 seconds (adjust interval as needed)
    const interval = setInterval(fetchHotels, 5000);

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      fetchHotels(); // Fetch hotels when component gains focus
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const fetchHotels = async () => {
    try {
      // Fetch hotel data from the backend API
      const response = await axios.get(`https://localhost:7246/api/SafetyTips`);
      // Access the data for hotels, travels, and vehicles from the response
      const offer = response.data;

      // Set the combined data in the state
      setHotels(offer);
    } catch (error) {
      // Handle error
      console.error("Error fetching hotel data:", error);
      // toast.error("Error fetching hotel data");
    }
  };

  const handleHotelDelete = async (id) => {
    try {
      // Make DELETE request to the backend API
      await axios.delete(`https://localhost:7246/api/SafetyTips/${id}`);

      // If the request is successful, remove the hotel from the state
      setHotels(hotels.filter((hotel) => hotel.id !== id));

      toast.success("Hotel Deleted Successfully 👌");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting hotel");
    }
  };

  const handleItemDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7246/api/SafetyTips/${id}`);
      // If the request is successful, remove the item from the state
      setHotels(hotels.filter((item) => item.id !== id));
      toast.success("Offer deleted successfully");
    } catch (error) {
      console.error("Error deleting offer:", error);
      toast.error("Error deleting offer");
    }
  };

  const handleHotelUpdate = (hotel) => {
    // Open the add update modal with the selected hotel data for updating
    setHotelToUpdate(hotel);
    setIsUpdateModalOpen(true);
  };

  const handleAddHotel = () => {
    // Open the add modal
    setIsAddModalOpen(true);
    setHotelToUpdate(null);
  };

  return (
    <div className="container mx-auto mt-16 ml-5 pr-5">
      <div className="flex justify-between mb-4 items-center">
        <h2 className="text-lg font-semibold mb-4 bg-gray-100 rounded-lg shadow-md p-4 w-full  ">
          Saftey Rules
        </h2>
        <button
          className="bg-[#2A3288] text-white px-4 py-2 rounded hover:bg-blue-800 ml-16"
          onClick={handleAddHotel}
        >
          Add
        </button>
      </div>
      {/* Hotel list table */}
      <AddOfferRule
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setHotelToUpdate(null);
        }}
        hotelToUpdate={hotelToUpdate}
      />
      <AddRuleUpdate
        isOpen={isUpdateModalOpen} // Pass isOpen state for update modal
        onClose={() => {
          setIsUpdateModalOpen(false); // Close update modal
          setHotelToUpdate(null);
        }}
        hotelToUpdate={hotelToUpdate}
      />
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="font-mono text-md mb-4 bg-gray-100 rounded-lg shadow-md  w-full">
            {/* <tr className="bg-gray-100 p-2"> */}
            <tr className=" font-semibold mb-8 bg-gray-100 rounded-lg shadow-md p-4  border-dark-800">
              {/* <th className="border px-1 py-1">ID</th> */}
              <th className="border px-1 py-1">Number</th>

              <th className="border px-1 py-1">Description</th>
              <th className="border px-1 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="text-center">
                {/* <td className="border px-1 py-1 font-light text-xs">
                  {hotel.id}
                </td> */}

                <td className="border px-1 py-1 font-light text-xs">
                  {hotel.id}
                </td>
                <td className="border px-1 py-1 font-light text-xs">
                  {hotel.text}
                </td>

                <td className="border px-1 py-1 font-light text-xs">
                  <button
                    onClick={() => handleHotelUpdate(hotel)} // Pass hotel data to update modal
                    className="bg-[#2A3288] text-white px-1 py-1 rounded mx-1 m-3 hover:bg-blue-800"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleItemDelete(hotel.id, hotel.category)}
                    className="bg-red-500 text-white px-1 py-1 rounded mx-1 hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SafteyRule;
