import Image from "next/image";
import React from "react";

function Search({ onChange, searchInput, placeholder = "Search transcation" }) {
  return (
    <div className="relative min-w-80">
      <input
        type="text"
        alt="search"
        value={searchInput}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-white rounded-lg w-full  min-h-[45px] border border-beige-500 border-solid  placeholder:border-beige-500 text-[14px] pl-5"
      />
      <div className="absolute right-0 inset-y-0 flex items-center pr-3">
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
