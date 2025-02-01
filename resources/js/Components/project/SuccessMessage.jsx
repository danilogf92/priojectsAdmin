// components/SuccessMessage.jsx
import React from "react";

export default function SuccessMessage({ message, onClose }) {
  return (
    <div className="mt-20 fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center shadow-md">
      <div className="relative">
        <strong className="font-bold block">Success!</strong>
        <span className="block sm:inline">{message}</span>
        <button
          onClick={onClose}
          className="absolute top-1 right-1 px-3 focus:outline-none"
        >
          <svg
            className="fill-current h-6 w-6 text-green-500 hover:opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.354 5.646a.5.5 0 1 0-.708-.708L10 9.293 6.354 5.646a.5.5 0 1 0-.708.708L9.293 10l-3.647 3.646a.5.5 0 1 0 .708.708L10 10.707l3.646 3.647a.5.5 0 0 0 .708-.708L10.707 10l3.647-3.646z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
