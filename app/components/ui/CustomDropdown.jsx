import { cn } from "@/app/lib/cn";
import useScreenSize from "@/hooks/useScreenSize";
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

  iconPath = "/assets/icon-filter-mobile.svg",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(options[0].value);
  const dropDownRef = useRef(null);
  const screenSize = useScreenSize();

  const isMobileScreen = screenSize?.width <= 600;

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
    <div
      className={cn("relative", !isMobileScreen ? "min-w-48" : "min-w-fit")}
      ref={dropDownRef}
    >
      <button
        type="button"
        onClick={(event) => {
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "flex w-full items-center justify-between rounded-lg border border-solid border-beige-500 bg-white px-5 py-3 text-[14px] text-grey-900",
          className,
          isIcon && "w-auto border-none bg-transparent",
        )}
      >
        {isIcon ? (
          <Image
            src={isMobileScreen ? iconPath : "./assets/icon-ellipsis.svg"}
            alt="menu-icon"
            width="16"
            height="16"
            className="h-5 w-5 md:h-auto md:w-auto"
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
        <div
          className={cn(
            "absolute z-50 w-full rounded-lg bg-white text-[14px] text-grey-900 shadow-customBoxShadow",
            !isMobileScreen ? "w-full" : "right-0 min-w-36",
          )}
        >
          <ul className="max-h-64 divide-y-[1px] divide-grey-100 overflow-auto px-2">
            {options.map((option) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={cn(
                    selectedItem === option.value && "font-bold",
                    "w-full p-2 text-left",
                  )}
                  onClick={(event) => {
                    handleSelect(option.value);
                  }}
                >
                  <div className="flex items-center gap-2">
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
