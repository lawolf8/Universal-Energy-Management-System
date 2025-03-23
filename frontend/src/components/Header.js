import React from 'react';
import '../pulse-theme.css';

const Header = ({ title }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-2">
        <img 
          src="/assets/images/pulse-logo.png" 
          alt="Pulse Logo" 
          className="h-10 w-auto"
          onError={(e) => e.target.style.display = 'none'} 
        />
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-pulse-primary">Pulse</span>
            {title && <span className="ml-2 text-xl text-gray-600">| {title}</span>}
          </div>
          <span className="text-sm text-pulse-secondary">Smart Energy Management System</span>
        </div>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <span className="text-gray-600 text-sm">Saving energy, empowering homes</span>
      </div>
    </div>
  );
};

export default Header; 