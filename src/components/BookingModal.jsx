import { useState } from "react";
import emailjs from "@emailjs/browser";
import { ref, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ isOpen, onClose, show, movie }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate()

  if (!isOpen) return null;

  const handleBooking = async () => {
    try {
      const bookingData = {
        movieId: movie.id,
        movieTitle: movie.title,
        showTime: show.time,
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
      };

      await push(ref(db, "bookings"), bookingData);
      const emailParams = {
        user_name: name,
        user_email: email,
        user_phone: phone,
        show_time: show.time,
        movie_title: movie.title,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      alert("🎉 Booking Confirmed + Email Sent!");
      onClose();
      navigate('/')
    } catch (error) {
      console.error("Booking Error:", error);
      alert("Failed to book ticket. Try again!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-[90%] max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-3">Book Tickets – {show.time}</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <input
            type="tel"
            placeholder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
          />

          <button
            onClick={handleBooking}
            className="w-full bg-red-600 text-white py-2 rounded"
          >
            Confirm Booking
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
