import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddRuleUpdate = ({ isOpen, onClose, hotelToUpdate }) => {
  const [offer, setOffer] = useState({
    text: "",
  });

  useEffect(() => {
    if (hotelToUpdate) {
      setOffer({ text: hotelToUpdate.text });
    }
  }, [hotelToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send PUT request to the backend API
      const response = await axios.put(
        `https://localhost:7246/api/SafetyTips/${hotelToUpdate.id}`, // Include the hotel ID in the URL
        { text: offer.text }, // Pass the updated offer text in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Safety rule updated:", response.data);
      toast.success("Safety Rule Updated Successfully 👌");
      onClose(); // Close the modal after updating the safety rule
    } catch (error) {
      console.error("Error updating safety rule:", error);
      toast.error("Failed to update safety rule");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Update Rule</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="absolute mt-5 font-serif ">Description</label>
              <textarea
                name="text"
                value={offer.text}
                onChange={handleInputChange}
                className="form-input mt-2 ml-36 bg-gray-100 rounded-md p-2"
                rows="2"
                cols="30"
                required
              ></textarea>
            </div>
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#2A3288] text-white px-4 py-2 rounded"
            >
              Update Rule
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRuleUpdate;
