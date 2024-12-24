"use client";
import React, { useEffect, useMemo, useState } from "react";
import { financeData } from "@/data/data";
import Search from "./Search";
import DropDown from "../components/ui/CustomDropdown";
import Pagination from "./Pagination";
import TransactionTable from "./table/TransactionTable";
import { useSearchParams } from "next/navigation";
import {
  CategoryDropdownItems,
  SORT_ITEMS,
  SORT_OPTIONS,
  TABLE_HEADERS,
} from "./CONSTANTS.js";
import useDebounce from "@/hooks/useDebounce";

const ITEMS_PER_PAGE = 10;

function Transaction() {
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const debounceSearchInput = useDebounce(searchInput);
  const searchParams = useSearchParams();
  const search = searchParams.get("category");

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
    setSelectedCategory(search);
    return () => {
      setSelectedCategory(null);
    };
  }, [search]);

  // Calculate pagination
  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debounceSearchInput, selectedCategory, sortOption]);

  const handleSearch = (event) => setSearchInput(event.target.value);
  const handlePageChange = (value) => setCurrentPage(value);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(pageCount, prev + 1));

  return (
    <div className="rounded-xl bg-white p-8">
      <div className="flex justify-between items-center mb-5">
        <Search searchInput={searchInput} onChange={handleSearch} />
        <div className="flex gap-4">
          {/* //repeat */}
          <div className="flex gap-3 items-center">
            <p className="text-[14px] text-grey-500 font-[400]">Sort By</p>
            <DropDown options={SORT_ITEMS} onChange={setSortOption} />
          </div>
          <div className="flex gap-3 items-center">
            <p className="text-[14px] text-grey-500 font-[400]">Category</p>
            <DropDown
              options={CategoryDropdownItems()}
              onChange={setSelectedCategory}
              selected={selectedCategory}
            />
          </div>
        </div>
      </div>

      {currentPageData.length > 0 ? (
        <>
          <TransactionTable
            transactions={currentPageData}
            TABLE_HEADERS={TABLE_HEADERS}
          />
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
