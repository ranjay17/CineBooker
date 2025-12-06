import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  return (
    <div className="shadow-md px-6 py-4 bg-white">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          Cine-Booker
        </h1>
        <div className="flex gap-4">
          <Link to="/">
            <button className="px-4 py-1 rounded-md border border-gray-300 hover:bg-gray-100 transition">
              Home
            </button>
          </Link>

          {admin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-md border border-red-500 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          ) : (
            <Link to="/admin/login">
              <button className="px-4 py-1 rounded-md border border-blue-500 text-blue-600 hover:bg-blue-50 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
