import { cn } from "@/app/lib/cn";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function DropDown({
  options,
  onChange = () => {},
  selected,
  isTheme,
  isEdit,
  isIcon,
  className,
  onIntialValue = () => {},
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0].value);
  const dropDownRef = useRef(null);

  useEffect(() => {
    if (!isEdit) onIntialValue(selectedItem);
  }, [selectedItem, isEdit]);

  useEffect(() => {
    const handleDropDownRef = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleDropDownRef);
    return () => document.addEventListener("mousedown", handleDropDownRef);
  }, []);

  const handleSelect = (value) => {
    setSelectedItem(value);
    setIsOpen(false);
    onChange(value);
  };
  return (
    <div className="relative min-w-48" ref={dropDownRef}>
      <button
        type="button"
        onClick={(event) => {
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "border border-solid border-beige-500 rounded-lg bg-white py-3 px-5 text-grey-900 text-[14px] flex items-center w-full justify-between ",
          className,
          isIcon && "w-auto border-none bg-transparent"
        )}
      >
        {isIcon ? (
          <Image
            src="./assets/icon-ellipsis.svg"
            alt="menu-icon"
            width="16"
            height="16"
          />
        ) : (
          <>
            {selected || selectedItem}
            <Image
              src="./assets/icon-caret-down.svg"
              alt="icon"
              width="12"
              height="12"
            />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full shadow-customBoxShadow text-[14px] text-grey-900 rounded-lg bg-white">
          <ul className="px-2 divide-y-[1px] divide-grey-100 overflow-auto max-h-64">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={cn(
                    selectedItem === option.value && "font-bold",
                    "p-2 w-full text-left "
                  )}
                  onClick={(event) => {
                    handleSelect(option.value);
                  }}
                >
                  <div className="flex gap-2 items-center">
                    {isTheme && (
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ background: option.theme }}
                      ></div>
                    )}
                    <p className="p-[3px">{option.value}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DropDown;
