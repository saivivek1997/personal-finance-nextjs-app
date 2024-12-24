import React, { useEffect, useState } from "react";

function useDebounce(searchInput) {
  const [debounceSearchInput, setDebounceSearchInput] = useState(searchInput);
  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setDebounceSearchInput(searchInput);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchInput]);

  return debounceSearchInput;
}

export default useDebounce;
