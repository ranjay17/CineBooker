import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Cine-Booker</h2>
            <p className="text-sm text-gray-400">
              Your trusted place to book movie tickets with ease.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-sm text-gray-400">
              Email: support@cinebooker.com
            </p>
            <p className="text-sm text-gray-400 mt-2">Phone: +91 98765 43210</p>
          </div>
        </div>
        <div className="border-t border-gray-700 my-6"></div>
        <p className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Cine-Booker. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
