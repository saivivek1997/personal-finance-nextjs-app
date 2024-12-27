import { getCustomFormat } from "@/utils/customDate";
import Image from "next/image";
import React from "react";
import { cn } from "../lib/cn";

function MobileTransactionTable({
  name,
  category,
  date,
  amount,
  avatar,
  isPaid,
  isDueSoon,
  isRecurring,
}) {
  const transactionDate = new Date(date);
  return (
    <div className=" w-full ">
      <div className="flex justify-between mb-6">
        <div className="flex gap-4 items-center  ">
          <Image
            src={avatar}
            alt={name}
            height={32}
            width={32}
            className="rounded-full"
          />
          <div>
            <p className="text-xs font-bold text-grey-900">{name}</p>
            {isRecurring ? (
              <div
                className={cn(
                  "text-xs font-normal text-grey-500",
                  isPaid && "text-customGreen"
                )}
              >
                <div className="flex gap-2 items-center">
                  Monthly-{transactionDate.getDate()}{" "}
                  {isPaid && (
                    <Image
                      src="/assets/icon-bill-paid.svg"
                      alt="paid-icon"
                      height={12}
                      width={12}
                    />
                  )}
                  {isDueSoon && (
                    <Image
                      src="/assets/icon-bill-due.svg"
                      alt="dueSoon-icon"
                      height={12}
                      width={12}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="text-xs font-normal text-grey-500">
                {category}{" "}
              </div>
            )}
          </div>
        </div>
        {!isRecurring && (
          <p className="text-xs font-normal text-grey-500">
            {getCustomFormat(date)}
          </p>
        )}
        <p
          className={cn(
            "text-xs font-[900]",
            amount > 0 ? "text-customGreen" : "text-gray-900"
          )}
        >
          <span>{amount > 0 ? "+" : "-"}</span> ${Math.abs(amount)}
        </p>
      </div>
    </div>
  );
}

export default MobileTransactionTable;
