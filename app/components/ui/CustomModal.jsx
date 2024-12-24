import React from "react";
import Image from "next/image";

export default function CustomModal({ isVisible, onClose, title, children }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div
        className="absolute inset-0"
        onClick={onClose} // Close modal on clicking the background
      ></div>
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-customBoxShadow max-w-md w-full z-10 ">
        {/* Header */}
        <div className="flex justify-between items-center pt-4 pb-2 px-6  ">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black focus:outline-none"
          >
            <Image
              src="/assets/icon-close-modal.svg"
              alt="close-icon"
              width="24"
              height="24"
            />
          </button>
        </div>
        {/* Body */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
