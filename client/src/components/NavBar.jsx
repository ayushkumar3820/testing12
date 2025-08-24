import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext";



const Navbar = () => {  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <Link
            to="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600"
          >
            MERN Blog
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>

            {user && (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Dashboard
              </Link>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
