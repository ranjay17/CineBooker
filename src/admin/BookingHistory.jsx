import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookingsRef = ref(db, "bookings");

    onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setBookings(formatted);
      } else {
        setBookings([]);
      }
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <p className="text-center p-6 text-lg">Loading Booking History...</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🎟 Booking History</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border">
          <table className="w-full border-collapse bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3 border">Movie</th>
                <th className="p-3 border">Show Time</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="text-center border-b hover:bg-gray-50"
                >
                  <td className="p-3 border font-semibold">{b.movieTitle}</td>
                  <td className="p-3 border">{b.showTime}</td>
                  <td className="p-3 border">{b.name}</td>
                  <td className="p-3 border">{b.email}</td>
                  <td className="p-3 border">{b.phone}</td>
                  <td className="p-3 border text-sm text-gray-600">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
