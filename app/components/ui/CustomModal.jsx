import React from "react";
import Image from "next/image";

export default function CustomModal({ isVisible, onClose, title, children }) {
  React.useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="z-10 min-h-fit w-full max-w-sm overflow-y-auto rounded-lg bg-white shadow-customBoxShadow md:max-w-md">
        <div className="flex items-center justify-between px-6 pb-2 pt-4">
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
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
