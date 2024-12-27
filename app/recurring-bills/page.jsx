"use client";
import Image from "next/image";
import React from "react";
import RecurringTable from "./RecurringTable.";
import useRecurringBillsData from "@/hooks/useRecurringBillsData";

function RecurringBillsPage() {
  const { recurringTotalCounts, paid, upcoming, dueSoon } =
    useRecurringBillsData();

  return (
    <div className="mb-8 min-h-screen bg-beige-100 p-4 md:mb-0">
      <h1 className="mb-4 text-3xl font-bold text-grey-900">Recurring Bills</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_2fr]">
        <div className="space-y-6">
          <div className="flex min-h-44 flex-row items-center gap-5 rounded-xl bg-grey-900 p-2 md:flex-col md:items-start md:justify-between md:p-6">
            <Image
              src="./assets/icon-recurring-bills.svg"
              alt="recurring-icon"
              height={20}
              width={20}
            />
            <div className="space-y-1">
              <p className="text-[14px] font-[400] text-white"> Total Bills</p>
              <p className="text-3xl font-bold text-white">
                $
                {recurringTotalCounts.paid +
                  recurringTotalCounts.upcoming +
                  recurringTotalCounts.dueSoon}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white p-4">
            <h1 className="text-base font-bold text-grey-900"> Summary</h1>
            <div className="divide-y divide-grey-300">
              <div className="flex items-center justify-between p-3">
                <p className="text-xs text-grey-500">Paid Bills</p>
                <p className="text-xs font-bold">
                  {recurringTotalCounts.paidCount +
                    " (" +
                    "$" +
                    recurringTotalCounts.paid.toFixed(2) +
                    ")"}
                </p>
              </div>
              <div className="flex items-center justify-between p-3">
                <p className="text-xs text-grey-500">Total Upcoming</p>
                <p className="text-xs font-bold">
                  {recurringTotalCounts.upcomingCount +
                    " (" +
                    "$" +
                    recurringTotalCounts.upcoming.toFixed(2) +
                    ")"}
                </p>
              </div>
              <div className="flex items-center justify-between p-3">
                <p className="text-xs text-customRed">Due Soon</p>
                <p className="text-xs font-bold text-customRed">
                  {recurringTotalCounts.dueSoonCount +
                    " (" +
                    "$" +
                    recurringTotalCounts.dueSoon.toFixed(2) +
                    ")"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <RecurringTable
            recurringBillsData={[...paid, ...dueSoon, ...upcoming]}
            recurringTotalCounts={recurringTotalCounts}
          />
        </div>
      </div>
    </div>
  );
}

export default RecurringBillsPage;
