"use client";

import { financeData } from "@/data/data";
import Image from "next/image";
import React from "react";
import RecurringTable from "./RecurringTable.";

function RecurringBillsPage() {
  const recurringBills = financeData.transactions.filter(
    (trans) => trans.recurring
  );
  const requiredDate = new Date(financeData.transactions[0].date).getDate();
  const newMaxDate = requiredDate + 5;

  const paid = recurringBills
    .filter((trans) => {
      return new Date(trans.date).getMonth() === 7;
    })
    .map((trans) => ({ ...trans, isPaid: true }));

  const dueSoon = recurringBills
    .filter((trans) => {
      return (
        new Date(trans.date).getDate() >= requiredDate &&
        new Date(trans.date).getDate() <= newMaxDate &&
        new Date(trans.date).getMonth() === 6
      );
    })
    .map((trans) => ({ ...trans, isDueSoon: true }));

  const upcoming = recurringBills
    .filter((trans) => {
      const transactionDate = new Date(trans.date);
      return (
        transactionDate.getMonth() === 6 &&
        transactionDate.getDate() > newMaxDate
      );
    })
    .map((trans) => ({ ...trans, isUpcoming: true }));

  const recurringTotalCounts = {
    paid: paid.reduce((acc, curr) => Math.abs(acc) + Math.abs(curr.amount), 0),
    paidCount: paid.length,
    dueSoon: dueSoon.reduce(
      (acc, curr) => Math.abs(acc) + Math.abs(curr.amount),
      0
    ),
    dueSoonCount: dueSoon.length,
    upcoming: upcoming.reduce(
      (acc, curr) => Math.abs(acc) + Math.abs(curr.amount),
      0
    ),
    upcomingCount: upcoming.length,
  };

  return (
    <div className="bg-beige-100 min-h-screen p-4 ">
      <h1 className="text-grey-900  text-3xl font-bold mb-4">
        Recurring Bills
      </h1>
      <div className="grid  grid-cols-[1fr_2fr] gap-6 ">
        <div className="space-y-6">
          <div className="bg-grey-900 rounded-xl p-6 min-h-44 flex flex-col justify-between">
            <Image
              src="./assets/icon-recurring-bills.svg"
              alt="recurring-icon"
              height={20}
              width={20}
            />
            <div className="space-y-1">
              <p className="text-[14px] text-white font-[400]"> Total Bills</p>
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
              <div className="flex justify-between items-center p-3">
                <p className="text-xs text-grey-500 ">Paid Bills</p>
                <p className="text-xs font-bold">
                  {recurringTotalCounts.paidCount +
                    " (" +
                    "$" +
                    recurringTotalCounts.paid.toFixed(2) +
                    ")"}
                </p>
              </div>
              <div className="flex justify-between items-center p-3">
                <p className="text-xs text-grey-500">Total Upcoming</p>
                <p className="text-xs font-bold">
                  {recurringTotalCounts.upcomingCount +
                    " (" +
                    "$" +
                    recurringTotalCounts.upcoming.toFixed(2) +
                    ")"}
                </p>
              </div>
              <div className="flex justify-between items-center p-3">
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
