import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AddOfferModal = ({ isOpen, onClose, onAddOffer }) => {
  const [offer, setOffer] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [addedImage, setAddedImage] = useState(""); // State to store the URL of the added image

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Title", offer.title);
      formData.append("Description", offer.description);
      formData.append("file", offer.file);

      const response = await axios.post(
        `https://localhost:7246/api/Offer`, // URL to your backend API endpoint for creating offers
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Offer added:", response.data);
      toast.success("Offer Added Successfully 👌");
      onClose(); // Close the modal after adding the offer
    } catch (error) {
      console.error("Error adding offer:", error);
      toast.error("Failed to add offer");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOffer({ ...offer, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setOffer({ ...offer, file: file }); // Set the selected file

    // Display the selected image instantly
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAddedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setAddedImage(""); // Clear the image if no file is selected
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Add Offer</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-serif">Title</label>
              <input
                type="text"
                name="title"
                value={offer.title}
                onChange={handleInputChange}
                className="form-input ml-32 p-2 bg-gray-100 rounded-md"
                required
              />
            </div>
            <div>
              <label className="absolute mt-5 font-serif ">Description</label>
              <textarea
                name="description"
                value={offer.description}
                onChange={handleInputChange}
                className="form-input mt-2 ml-36 bg-gray-100 rounded-md p-2"
                rows="2"
                cols="30"
                required
              ></textarea>
            </div>

            <div>
              {/* Display the selected image */}
              {addedImage && (
                <div>
                  <label className="absolute mt-14 font-serif">
                    Selected Image
                  </label>
                  <img
                    src={addedImage}
                    alt="Selected Image"
                    className="mt-2 ml-44 h-40 min-w-1.5  rounded-xl border border-gray-300"
                  />
                </div>
              )}
            </div>
            <div>
              <label className="absolute mt-5 font-serif ">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="form-input mt-2 ml-20 bg-gray-100 rounded-md p-2"
                required
              />
            </div>
          </div>
          <div className="col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-[#2A3288] text-white px-4 py-2 rounded"
            >
              Add Offer
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

export default AddOfferModal;
