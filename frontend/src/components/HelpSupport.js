import React from 'react';
import '../pulse-theme.css';

const HelpSupport = ({ setShowHelpSupport }) => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-pulse-primary">Help & Support</h2>
        <button 
          onClick={() => setShowHelpSupport(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-pulse-primary mb-3">FAQs</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">How do I add a new device?</h4>
              <p className="text-gray-600">Navigate to a room and click the "Add Device" button. Follow the on-screen instructions to connect your device.</p>
            </div>
            <div>
              <h4 className="font-medium">How does automation work?</h4>
              <p className="text-gray-600">Set up automation rules in the device settings. You can create schedules or triggers based on other device states.</p>
            </div>
            <div>
              <h4 className="font-medium">Is my data secure?</h4>
              <p className="text-gray-600">Yes, we use industry-standard encryption and security practices to protect your data.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-pulse-primary mb-3">Contact Support</h3>
          <p className="mb-4 text-gray-600">Our support team is available 24/7. Reach out to us through any of these channels:</p>
          <div className="space-y-3">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pulse-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>support@pulse-energy.com</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pulse-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>1-800-PULSE-ENERGY</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pulse-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Live Chat (available in app)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-pulse-primary mb-3">Tutorials & Documentation</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <a href="#" className="block p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium mb-1">Getting Started Guide</h4>
            <p className="text-sm text-gray-600">Basic setup and configuration</p>
          </a>
          <a href="#" className="block p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium mb-1">Device Compatibility</h4>
            <p className="text-sm text-gray-600">List of supported devices</p>
          </a>
          <a href="#" className="block p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <h4 className="font-medium mb-1">Advanced Automation</h4>
            <p className="text-sm text-gray-600">Create complex automation rules</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport; 