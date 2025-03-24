import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, HelpCircle, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../pulse-theme.css';

const ProfileDropdown = ({ setShowAccountSettings }) => {
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle clicking outside of dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAccountClick = (type) => {
    setIsOpen(false);
    if (type === 'account') {
      setShowAccountSettings(true);
    } else if (type === 'help') {
      setShowAccountSettings(true, 'support');
    } else if (type === 'settings') {
      setShowAccountSettings(true, 'settings');
    }
  };

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-pulse-primary"
      >
        <User className="h-5 w-5 text-gray-700" />
        <span className="text-gray-700 font-medium">{user?.name || 'User'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-2 px-4 border-b border-gray-200">
            <div className="font-medium text-gray-800">{user?.name || 'User'}</div>
            <div className="text-sm text-gray-500">{user?.email || 'user@example.com'}</div>
          </div>
          <div className="py-1">
            <button
              onClick={() => handleAccountClick('account')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <User className="h-4 w-4 mr-2" />
              My Account
            </button>
            <button
              onClick={() => handleAccountClick('settings')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            <button
              onClick={() => handleAccountClick('help')}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & Support
            </button>
          </div>
          <div className="py-1 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 