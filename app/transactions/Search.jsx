import useScreenSize from "@/hooks/useScreenSize";
import Image from "next/image";
import React from "react";
import { cn } from "../lib/cn";

function Search({ onChange, searchInput, placeholder = "Search transcation" }) {
  const screenSize = useScreenSize();

  const isMobileScreen = screenSize?.width <= 600;
  return (
    <div className={cn("relative", !isMobileScreen ? "min-w-80" : "min-w-44")}>
      <input
        type="text"
        alt="search"
        value={searchInput}
        onChange={onChange}
        placeholder={placeholder}
        className="min-h-[45px] w-full rounded-lg border border-solid border-beige-500 bg-white pl-5 text-[14px] placeholder:border-beige-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
        <Image
          src="./assets/icon-search.svg"
          alt="search icon"
          width="20"
          height="20"
        />
      </div>
    </div>
  );
}

export default Search;
