import { PlusCircle, Film, History } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const admin = localStorage.getItem("adminToken");
  if (!admin) return null;

  return (
    <div className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 px-4 py-6">
      <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
        Admin Panel
      </h2>

      <Link to="/admin/add-movie">
        <button className="w-full flex items-center gap-3 bg-blue-100 py-3 px-4 rounded-xl text-blue-700 font-medium hover:bg-blue-200 transition">
          <PlusCircle size={20} /> Add Movie
        </button>
      </Link>

      <Link to="/admin/manage-movie">
        <button className="w-full flex items-center gap-3 bg-orange-100 py-3 px-4 rounded-xl text-orange-700 font-medium hover:bg-orange-200 transition">
          <Film size={20} /> Manage Movies
        </button>
      </Link>

      <Link to="/admin/bookings">
        <button className="w-full flex items-center gap-3 bg-green-100 py-3 px-4 rounded-xl text-green-700 font-medium hover:bg-green-200 transition">
          <History size={20} /> Booking History
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
