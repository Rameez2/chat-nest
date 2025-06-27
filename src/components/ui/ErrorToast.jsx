import React from 'react';

const ErrorToast = ({error,setError}) => {
    return (
  <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-lg transition transform duration-500 ease-out animate-in slide-in-from-right fade-in z-50 flex items-center justify-between gap-4 min-w-[300px]">
    <span>{error}</span>
    <button
      onClick={() => setError("")}
      className="text-white hover:text-gray-200 text-lg font-bold focus:outline-none cursor-pointer"
    >
      &times;
    </button>
  </div>
    );
}

export default ErrorToast;
