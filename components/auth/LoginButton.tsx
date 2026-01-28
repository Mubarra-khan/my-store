"use client";

import { useState } from 'react';
import { User, LogOut } from 'lucide-react';

const LoginButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowDropdown(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      {isLoggedIn ? (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            <User className="w-4 h-4" />
            <span>Account</span>
          </button>

          {showDropdown && (
            <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-medium text-gray-900">User</p>
                <p className="text-xs text-gray-500">user@example.com</p>
              </div>
              
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700 text-sm">
                My Profile
              </button>
              
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700 text-sm">
                My Orders
              </button>
              
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700 text-sm">
                Wishlist
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600 font-medium text-sm mt-1 border-t border-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default LoginButton;