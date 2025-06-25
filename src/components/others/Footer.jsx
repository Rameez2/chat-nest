import React from 'react';

const Footer = () => {
    return (
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ChatConnect
            </span>
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-purple-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Community Guidelines
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              Support
            </a>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">© 2024 ChatConnect. All rights reserved.</div>
      </footer>
    );
}

export default Footer;
