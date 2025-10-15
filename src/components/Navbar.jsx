import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.info("👋 Logged out successfully!");
      navigate("/login");
    } catch (err) {
      toast.error("Logout failed!");
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      {/* Left Side - Brand */}
      <Link to="/home" className="font-bold text-xl hover:text-yellow-300">
        BusyBuy 🛍️
      </Link>

      {/* Right Side - Navigation Links */}
      <div className="space-x-6 flex items-center">
        {user ? (
          // 🟢 When Logged In
          <>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
            <Link to="/cart" className="hover:underline">
              Cart
            </Link>
            <Link to="/orders" className="hover:underline">
              Orders
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          // 🔵 When Logged Out
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-blue-800 px-3 py-1 rounded hover:bg-yellow-500 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
