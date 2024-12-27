"use client";
import React, { useEffect, useMemo, useState } from "react";
import { financeData } from "@/data/data";
import Search from "./Search";
import DropDown from "../components/ui/CustomDropdown";
import Pagination from "./Pagination";
import TransactionTable from "./table/TransactionTable";

import {
  CategoryDropdownItems,
  SORT_ITEMS,
  SORT_OPTIONS,
  TABLE_HEADERS,
} from "./CONSTANTS.js";
import useDebounce from "@/hooks/useDebounce";
import useTransactionHook from "@/hooks/useTransactionHook";
import MobileTransactionTable from "./MobileTransactionTable";
import useScreenSize from "@/hooks/useScreenSize";

function Transaction() {
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const debounceSearchInput = useDebounce(searchInput);
  const [searchParams, setSearchParams] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params.get("category"));
  }, []);

  const filteredData = useMemo(() => {
    let data = [...financeData.transactions];

    // Apply filters
    if (debounceSearchInput) {
      data = data.filter((trans) =>
        trans.name.toLowerCase().includes(debounceSearchInput.toLowerCase()),
      );
    }

    if (selectedCategory && selectedCategory !== "All Transactions") {
      data = data.filter((trans) => trans.category === selectedCategory);
    }

    // Apply sorting
    if (sortOption) {
      const sortFunctions = {
        [SORT_OPTIONS.LATEST]: (a, b) => new Date(b.date) - new Date(a.date),
        [SORT_OPTIONS.OLDEST]: (a, b) => new Date(a.date) - new Date(b.date),
        [SORT_OPTIONS.A_TO_Z]: (a, b) => a.name.localeCompare(b.name),
        [SORT_OPTIONS.Z_TO_A]: (a, b) => b.name.localeCompare(a.name),
        [SORT_OPTIONS.HIGHEST]: (a, b) => b.amount - a.amount,
        [SORT_OPTIONS.LOWEST]: (a, b) => a.amount - b.amount,
      };

      data.sort(sortFunctions[sortOption] || (() => 0));
    }
    return data;
  }, [debounceSearchInput, selectedCategory, sortOption]);

  //when search params changed and removes when when we navigate
  useEffect(() => {
    setSelectedCategory(searchParams);
    return () => {
      setSelectedCategory(null);
    };
  }, [searchParams]);

  const {
    handleNextPage,
    handlePageChange,
    handlePreviousPage,
    currentPage,
    pageCount,
    currentPageData,
    resetToCurrentPage,
  } = useTransactionHook(filteredData);

  // Reset pagination when filters change
  useEffect(() => {
    resetToCurrentPage();
  }, [debounceSearchInput, selectedCategory, sortOption]);

  const handleSearch = (event) => setSearchInput(event.target.value);

  const screenSize = useScreenSize();

  const isMobileScreen = screenSize.width <= 600;

  return (
    <div className="mb-6 rounded-xl bg-white p-8 md:mb-0">
      <div className="mb-5 flex items-center justify-between">
        <Search searchInput={searchInput} onChange={handleSearch} />
        <div className="flex gap-4">
          <div className="flex items-center gap-3">
            {!isMobileScreen && (
              <p className="text-[14px] font-[400] text-grey-500">Sort By</p>
            )}
            <DropDown
              options={SORT_ITEMS}
              onChange={setSortOption}
              isIcon={isMobileScreen}
              iconPath="/assets/icon-sort-mobile.svg"
            />
          </div>
          <div className="flex items-center gap-3">
            {!isMobileScreen && (
              <p className="text-[14px] font-[400] text-grey-500">Category</p>
            )}
            <DropDown
              options={CategoryDropdownItems()}
              onChange={setSelectedCategory}
              selected={selectedCategory}
              isIcon={isMobileScreen}
              iconPath="/assets/icon-filter-mobile.svg"
            />
          </div>
        </div>
      </div>

      {currentPageData.length > 0 ? (
        <>
          <div className="hidden md:block">
            <TransactionTable
              transactions={currentPageData}
              TABLE_HEADERS={TABLE_HEADERS}
            />
          </div>
          <div className="block md:hidden">
            {currentPageData.map((data, index) => (
              <MobileTransactionTable key={`${data.name}-${index}`} {...data} />
            ))}
          </div>
          <Pagination
            financeDataLength={filteredData.length}
            onPaginationChange={handlePageChange}
            paginationNumber={currentPage}
            onPreviousChange={handlePreviousPage}
            onNextChange={handleNextPage}
          />
        </>
      ) : (
        <p className="text-center text-grey-500">No transactions found</p>
      )}
    </div>
  );
}

export default Transaction;
