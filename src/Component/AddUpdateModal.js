import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../Screen/Context/AuthContext";

const AddHotelModal = ({ isOpen, onClose, hotelToUpdate }) => {
  const { user } = useAuth();

  const [hotel, setHotel] = useState({
    name: "",
    price: "",
    email: "",
    file: "",
    phoneNumber: "",
    rating: "",
    location: "",
    review: "",
    longDescription: "",
    shortDescription: "",
  });

  const [category, setCategory] = useState(""); // State for category selection
  const [addedImage, setAddedImage] = useState(""); // State to store the URL of the added image

  useEffect(() => {
    // If hotelToUpdate exists, set the hotel state with its data
    if (hotelToUpdate) {
      setHotel(hotelToUpdate);
    }
  }, [hotelToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", hotel.id); // Include the hotel ID
      formData.append("name", hotel.name);
      formData.append("price", hotel.price);
      formData.append("email", hotel.email);
      formData.append("file", hotel.image);
      formData.append("phoneNumber", hotel.phoneNumber);
      formData.append("rating", hotel.rating);
      formData.append("location", hotel.location);
      formData.append("review", hotel.review);
      formData.append("longDescription", hotel.longDescription);
      formData.append("shortDescription", hotel.shortDescription);

      await axios.put(
        `https://localhost:7246/api/${category}/${hotel.id}`,
        formData, // Pass the form data here
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`, // Include the JWT token in the Authorization header
          },
        }
      );
      toast.success(`${category} Updated Successfully 👌`);
      onClose(); // Close the modal after updating the hotel
    } catch (error) {
      console.error("Error:", error);
      toast.error(`Error Updating hotel`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  // // Function to handle file selection
  // const handleFileChange = (e) => {
  //   setHotel({ ...hotel, image: e.target.files[0] }); // Set the selected file
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHotel({ ...hotel, image: file }); // Set the selected file

    console.log(file);
    // Display the selected imagecon instantly
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
        <h1 className="text-2xl font-bold mb-4">Update {category}</h1>

        <form onSubmit={handleSubmit}>
          {/* Add dropdown for category selection */}

          {/* Hotel form fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-serif">Name</label>
              <input
                type="text"
                name="name"
                value={hotel.name}
                onChange={handleInputChange}
                className="form-input ml-32 p-2 bg-gray-100 rounded-md"
                required
              />
            </div>
            <div>
              <label className="font-serif">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select mt-2 ml-10 bg-gray-100 p-2 rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="HotelList">Hotel</option>
                <option value="TravelList">Travel</option>
                <option value="VehicleList">Vehicle</option>
              </select>
            </div>

            <div>
              <label className=" font-serif ">Price</label>
              <input
                type="number"
                name="price"
                value={hotel.price}
                onChange={handleInputChange}
                className="form-input ml-36  w-20 bg-gray-100 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className=" font-serif ">Email</label>
              <input
                type="email"
                name="email"
                value={hotel.email}
                onChange={handleInputChange}
                className="form-input mt-2 ml-14  p-2 w-72  bg-gray-100 rounded-md"
                required
              />
            </div>

            <div>
              <label className="font-serif">Phone Number</label>
              <input
                type="tel" // Change type to "tel"
                name="phoneNumber"
                value={hotel.phoneNumber}
                onChange={handleInputChange}
                className="form-input ml-16 bg-gray-100 rounded-md p-2"
                required
                minLength="10" // Add minLength attribute
                maxLength="10" // Add maxLength attribute
                pattern="[0-9]{10}" // Add pattern attribute to enforce numeric input
              />
            </div>
            <div>
              <label className=" font-serif ">Rating</label>
              <input
                type="number"
                name="rating"
                value={hotel.rating}
                onChange={handleInputChange}
                className="form-input mt-2 ml-12 bg-gray-100 rounded-md p-2"
                required
                max="5" // Add max attribute to limit the input
                min="0"
              />
            </div>
            <div>
              <label className=" font-serif ">Location</label>
              <input
                type="text"
                name="location"
                value={hotel.location}
                onChange={handleInputChange}
                className="form-input mt-2 ml-28 p-2  bg-gray-100 rounded-md"
                required
              />
            </div>
            <div>
              <label className=" font-serif ">Review</label>
              <input
                type="number"
                name="review"
                value={hotel.review}
                onChange={handleInputChange}
                className="form-input mt-2 ml-12 p-2 bg-gray-100 w-14 rounded-md"
                required
              />
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
            <div>
              <label className="absolute mt-10 font-serif ">
                Long Description
              </label>
              <textarea
                name="longDescription"
                value={hotel.longDescription}
                onChange={handleInputChange}
                className="form-input mt-2 ml-40 bg-gray-100 rounded-md p-2"
                rows="4"
                cols="30"
                required
              ></textarea>
            </div>
            <div>
              <label className="absolute mt-5 font-serif ">
                Short Description
              </label>
              <textarea
                name="shortDescription"
                value={hotel.shortDescription}
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
              Update {category}
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

export default AddHotelModal;
