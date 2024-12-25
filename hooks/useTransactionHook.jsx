import { useState } from "react";
const ITEMS_PER_PAGE = 10;

function useTransactionHook(filteredData) {
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate pagination
  function resetToCurrentPage() {
    setCurrentPage(1);
  }
  const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentPageData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const handlePageChange = (value) => setCurrentPage(value);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(1, prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(pageCount, prev + 1));

  return {
    handleNextPage,
    handlePageChange,
    handlePreviousPage,
    currentPage,
    pageCount,
    currentPageData,
    resetToCurrentPage,
  };
}

export default useTransactionHook;
