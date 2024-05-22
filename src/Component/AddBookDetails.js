// AddBookDetails.js
import React from "react";
import jsPDF from "jspdf";
import logo from ".././data/image.png"; // Import the image
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddBookDetails({ booking, handleBack }) {
  const generateInvoice = () => {
    // Create a new instance of jsPDF
    const pdf = new jsPDF("p", "mm", "a4"); // Set the paper size to A4
    pdf.setFontSize(11); // Set a consistent font size

    // Add company logo
    const logoWidth = 30; // Adjust as needed
    const logoHeight = 30; // Adjust as needed
    pdf.addImage(logo, "PNG", 15, 10, logoWidth, logoHeight);

    // Add company information
    const companyName = "Sahaj Yatri";
    const companyAddress = "Nepal, Itahari, Province 1, 2222";
    const companyEmail = booking.email;
    const companyWebsite = "www.sahajYatri.com";
    const yPos = 50;
    pdf.setFontSize(14); // Increase font size for company name
    pdf.text(companyName, 20, yPos);
    pdf.setFontSize(11); // Reset font size
    pdf.text(companyAddress, 20, yPos + 5);
    pdf.text(`Email: ${companyEmail}`, 20, yPos + 10);
    pdf.text(`Website: ${companyWebsite}`, 20, yPos + 15);

    // Add invoice details
    const invoiceDate = new Date().toLocaleDateString();
    const paymentTerms = "Completed";
    pdf.text(
      `Date: ${invoiceDate}`,
      pdf.internal.pageSize.getWidth() - 90,
      yPos,
      null,
      null,
      "right"
    ); // Align right
    pdf.text(
      `Payment: ${paymentTerms}`,
      pdf.internal.pageSize.getWidth() - 90,
      yPos + 5,
      null,
      null,
      "right"
    ); // Align right

    // Add a horizontal line
    pdf.setLineWidth(0.5);
    pdf.line(15, yPos + 20, pdf.internal.pageSize.getWidth() - 15, yPos + 20);

    // Add customer information
    pdf.text(`Bill To: ${booking.userName}`, 20, yPos + 25);
    // pdf.text(`${booking.userName}`, 20, yPos + 30);

    // Add booking details
    let detailsYPos = yPos + 40;
    pdf.setFontSize(13); // Increase font size for section headers
    pdf.text("Booking Details:", 20, detailsYPos);
    pdf.setFontSize(11); // Reset font size
    detailsYPos += 5;
    pdf.text(`Start Date: ${booking.startDate}`, 20, detailsYPos);
    detailsYPos += 5;
    pdf.text(`End Date: ${booking.endDate}`, 20, detailsYPos);
    detailsYPos += 5;
    pdf.text(`Number of Guests: ${booking.numberOfGuests}`, 20, detailsYPos);
    detailsYPos += 5;
    pdf.text(`Name: ${booking.name}`, 20, detailsYPos);

    // Add pricing details
    detailsYPos += 10;
    pdf.setFontSize(13); // Increase font size for section headers

    pdf.text("Pricing:", 20, detailsYPos);
    pdf.setFontSize(11); // Reset font size
    detailsYPos += 5;
    pdf.text(
      `Price Per Day: $${booking.pricePerDay.toFixed(2)}`,
      20,
      detailsYPos
    );
    detailsYPos += 5;
    pdf.text(`Total Price: $${booking.totalPrice.toFixed(2)}`, 20, detailsYPos);

    // Add a thank you message
    detailsYPos += 15;
    pdf.setFontSize(13); // Increase font size for section headers
    pdf.text(
      "--------------------------------------Thank you for joining us!-----------------------------------------------",
      20,
      detailsYPos
    );

    // Save the PDF to a file
    pdf.save("invoice.pdf");

    toast.success("Invoice Generated successfully");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-auto">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Booking Details</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleBack}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {booking ? (
          <div className="space-y-2">
            {/* <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Booking ID:</span> {booking.id}
              </p>
            </div> */}
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">User Name:</span>{" "}
                {booking.userName}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Start Date:</span>{" "}
                {booking.startDate}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">End Date:</span>{" "}
                {booking.endDate}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Number of Guests:</span>{" "}
                {booking.numberOfGuests}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Total Price:</span> $
                {booking.totalPrice}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Price Per Day:</span> $
                {booking.pricePerDay}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Status:</span> {booking.status}
              </p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Name:</span> {booking.name}
              </p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className="mt-6 text-right">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            onClick={generateInvoice}
          >
            Generate Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddBookDetails;
