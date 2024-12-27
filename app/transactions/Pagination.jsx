import Image from "next/image";
import React from "react";
import { cn } from "../lib/cn";

function PaginationButton({
  icon,
  text,
  order,
  type,
  className,
  isSelected,
  disabled,
  onPaginationChange = () => {},
}) {
  return (
    <button
      className={cn(
        "flex items-center justify-between rounded-lg border border-solid border-beige-500 bg-white px-3 py-2 text-[14px] text-grey-900 disabled:cursor-not-allowed",
        type ? "min-w-fit" : "min-w-24",
        className,
        isSelected && "bg-grey-900 text-white",
      )}
      onClick={onPaginationChange}
      disabled={disabled}
    >
      {icon && (
        <Image
          src={icon}
          alt="arrow"
          height="12"
          width="12"
          className={cn(order && "order-last")}
        />
      )}
      <p>{text}</p>
    </button>
  );
}

function Pagination({
  financeDataLength,
  onPaginationChange,
  paginationNumber,
  onNextChange,
  onPreviousChange,
}) {
  const pageCount = Math.ceil(financeDataLength / 10);
  return (
    <div className="flex items-center md:items-start">
      <PaginationButton
        icon="./assets/icon-caret-left.svg"
        text="Prev"
        onPaginationChange={onPreviousChange}
        disabled={paginationNumber === 1}
        className="mr-1 h-8 md:h-auto"
      />
      <div className="mx-auto flex flex-wrap gap-3 md:flex-nowrap">
        {Array.from(
          { length: Math.ceil(financeDataLength / 10) },
          (_, index) => (
            <PaginationButton
              text={index + 1}
              key={index}
              type="number"
              onPaginationChange={() => onPaginationChange(index + 1)}
              isSelected={paginationNumber === index + 1}
            />
          ),
        )}
      </div>

      <PaginationButton
        icon="./assets/icon-caret-right.svg"
        text="Next"
        order
        onPaginationChange={onNextChange}
        disabled={paginationNumber === pageCount}
        className="h-8 md:h-auto"
      />
    </div>
  );
}

export default Pagination;
