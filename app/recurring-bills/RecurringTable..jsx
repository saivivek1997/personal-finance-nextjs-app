import React, { useEffect, useMemo, useState } from "react";
import TransactionTable from "../transactions/table/TransactionTable";
import Pagination from "../transactions/Pagination";
import useDebounce from "@/hooks/useDebounce";
import useTransactionHook from "@/hooks/useTransactionHook";
import { SORT_ITEMS, SORT_OPTIONS } from "../transactions/CONSTANTS";
import Search from "../transactions/Search";
import DropDown from "../components/ui/CustomDropdown";
import MobileTransactionTable from "../transactions/MobileTransactionTable";
import useScreenSize from "@/hooks/useScreenSize";

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
        trans.name.toLowerCase().includes(debounceSearchInput.toLowerCase()),
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

  const screenSize = useScreenSize();

  const isMobileScreen = screenSize?.width <= 600;

  return (
    <div className="min-h-screen rounded-xl bg-white p-8">
      <div className="mb-5 flex items-center justify-between">
        <Search
          searchInput={searchInput}
          onChange={handleSearch}
          placeholder="Search Bills"
        />
        <div className="flex gap-4">
          {/* //repeat */}
          <div className="flex items-center gap-3">
            {!isMobileScreen && (
              <p className="text-[14px] font-[400] text-grey-500">Sort By</p>
            )}
            <DropDown
              options={SORT_ITEMS}
              onChange={setSortOption}
              isIcon
              iconPath="/assets/icon-sort-mobile.svg"
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
              isRecurring
            />
          </div>
          <div className="block md:hidden">
            {currentPageData.map((data, index) => (
              <MobileTransactionTable
                key={`${data.name}-${index}`}
                {...data}
                isRecurring
              />
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

export default RecurringTable;
