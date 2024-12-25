import React, { useEffect, useMemo, useState } from "react";
import TransactionTable from "../transactions/table/TransactionTable";
import Pagination from "../transactions/Pagination";
import useDebounce from "@/hooks/useDebounce";
import useTransactionHook from "@/hooks/useTransactionHook";
import { SORT_ITEMS, SORT_OPTIONS } from "../transactions/CONSTANTS";
import Search from "../transactions/Search";
import DropDown from "../components/ui/CustomDropdown";

function RecurringTable({ recurringBillsData }) {
  const [searchInput, setSearchInput] = useState("");
  const [sortOption, setSortOption] = useState(null);

  const debounceSearchInput = useDebounce(searchInput);
  const TABLE_HEADERS = [
    { id: "billtitle", headerName: "Bill Title" },
    { id: "duedate", headerName: "Due Date" },
    { id: "amount", headerName: "Amount" },
  ];
  const filteredData = useMemo(() => {
    let data = [...recurringBillsData];
    // Apply filters
    if (debounceSearchInput) {
      data = data.filter((trans) =>
        trans.name.toLowerCase().includes(debounceSearchInput.toLowerCase())
      );
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
  }, [debounceSearchInput, sortOption]);

  const {
    handleNextPage,
    handlePageChange,
    handlePreviousPage,
    currentPage,
    pageCount,
    currentPageData,
    resetToCurrentPage,
  } = useTransactionHook(filteredData);

  useEffect(() => {
    resetToCurrentPage();
  }, [debounceSearchInput, sortOption]);

  const handleSearch = (event) => setSearchInput(event.target.value);

  return (
    <div className="bg-white rounded-xl min-h-screen p-8 ">
      <div className="flex justify-between items-center mb-5">
        <Search
          searchInput={searchInput}
          onChange={handleSearch}
          placeholder="Search Bills"
        />
        <div className="flex gap-4">
          {/* //repeat */}
          <div className="flex gap-3 items-center">
            <p className="text-[14px] text-grey-500 font-[400]">Sort By</p>
            <DropDown options={SORT_ITEMS} onChange={setSortOption} />
          </div>
        </div>
      </div>
      {currentPageData.length > 0 ? (
        <>
          <TransactionTable
            transactions={currentPageData}
            TABLE_HEADERS={TABLE_HEADERS}
            isRecurring
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

export default RecurringTable;
