"use client";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import Avatar from "./components/avatar";
import { getCustomFormat } from "@/utils/customDate";
import { useRouter } from "next/navigation";
import DoughnutChart from "./budgets/BudgetChart";
import { useDispatch } from "react-redux";
import { setBudgetData } from "@/lib/features/finance/financeSlice";
import useRecurringBillsData from "@/hooks/useRecurringBillsData";

function Home() {
  const { financeData } = useAppSelector((state) => state.finance);
  const totalPotAmount = useMemo(
    () => financeData.pots.reduce((acc, curr) => acc + curr.total, 0),
    [financeData],
  );
  const {
    recurringTotalCounts: { paid, upcoming, dueSoon },
  } = useRecurringBillsData();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    financeData.budgets.forEach(({ id, category, maximum, theme }) =>
      dispatch(setBudgetData({ id, category, maximum, theme })),
    );
  }, []);

  return (
    <div className="mb-12 min-h-screen bg-beige-100 p-4 md:mb-0">
      <h1 className="mb-2 text-base font-bold text-grey-900">Overview</h1>
      <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2 rounded-xl bg-grey-900 p-4 text-white">
          <p className="text-[14px] font-[400]">Current Balance</p>
          <p className="text-3xl font-bold">${financeData.balance.current}</p>
        </div>
        <div className="space-y-2 rounded-xl bg-white p-4">
          <p className="text-[14px] font-[400] text-grey-500">Income</p>
          <p className="text-3xl font-bold">${financeData.balance.income}</p>
        </div>
        <div className="space-y-2 rounded-xl bg-white p-4">
          <p className="text-[14px] font-[400]">Expenses</p>
          <p className="text-3xl font-bold text-grey-900">
            ${financeData.balance.expenses}
          </p>
        </div>
      </div>
      {/* =============================== */}
      <div className="flex flex-col gap-2 md:flex-row">
        <section className="mb-3 flex-1 space-y-2">
          <div className="mb-3 space-y-2 rounded-xl bg-white p-4">
            <div className="flex justify-between">
              <h1 className="text-[20px] font-bold">Pots</h1>
              <div className="flex items-center gap-2">
                <p
                  className="cursor-pointer text-[14px] text-grey-500"
                  onClick={() => router.push("/pots")}
                >
                  See Details
                </p>
                <Image
                  src="/assets/icon-caret-right.svg"
                  alt="right-caret"
                  height={6}
                  width={6}
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 md:flex-row">
              <div className="min-w-48 rounded-xl bg-beige-100 p-4">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/icon-pot.svg"
                    alt="pot-icon"
                    width={18}
                    height={18}
                  />
                  <div className="space-y-1">
                    <p className="text-[14px] text-grey-500">Total Saved </p>
                    <p className="text-2xl font-bold text-grey-900">
                      $ {totalPotAmount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid flex-1 grid-cols-2 gap-3">
                {financeData.pots.map((pot) => (
                  <div className="flex gap-2" key={pot.id}>
                    <div
                      style={{ background: pot.theme }}
                      className="w-1 rounded-lg"
                    ></div>
                    <div>
                      <p className="text-xs text-grey-500">{pot.name}</p>
                      <p className="text-[14px] font-bold text-grey-900">
                        ${pot.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* =============================== */}
          <div className="mb-3 rounded-xl bg-white px-4 py-4">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-base font-bold text-grey-900">
                Transactions
              </h1>
              <div className="flex items-center gap-2">
                <p
                  className="cursor-pointer text-[14px] text-grey-500"
                  onClick={() => router.push(`/transactions`)}
                >
                  View All
                </p>
                <Image
                  src="./assets/icon-caret-right.svg"
                  alt="right-icon"
                  width="6"
                  height="6"
                />
              </div>
            </div>

            <div className="space-y-2 divide-y-[1px] divide-grey-500 divide-opacity-15">
              {financeData.transactions
                .slice(0, 5)
                .map(({ name, avatar, amount, date }, index) => (
                  <div className="flex justify-between p-2" key={index}>
                    <div className="flex items-center gap-2">
                      <Avatar img={avatar} />
                      <p>{name}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-bold text-grey-900">
                        <span>{amount < 0 && "-"} </span>${Math.abs(amount)}
                      </p>
                      <p className="text-xs text-beige-500">
                        {getCustomFormat(date)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        <section className="flex-1">
          <div className="mb-3 rounded-xl bg-white px-4 py-4">
            <div className="flex justify-between">
              <h1 className="text-[20px] font-bold">Budgets</h1>
              <div
                className="flex items-center gap-2"
                onClick={() => router.push("/budgets")}
              >
                <p className="cursor-pointer text-[14px] text-grey-500">
                  See Details
                </p>
                <Image
                  src="/assets/icon-caret-right.svg"
                  alt="right-caret"
                  height={6}
                  width={6}
                />
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center justify-center md:flex-row">
              <DoughnutChart />
              <div className="ml-4 mt-4 grid grid-cols-2 gap-4 md:flex md:flex-col md:gap-2">
                {financeData.budgets.map((budget) => (
                  <div className="flex gap-2" key={budget.id}>
                    <div
                      style={{ background: budget.theme }}
                      className="w-1 rounded-lg"
                    ></div>
                    <div>
                      <p className="text-xs text-grey-500">{budget.category}</p>
                      <p className="text-[14px] font-bold text-grey-900">
                        ${budget.maximum}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white px-4 py-4">
            <div className="mb-2 flex items-center justify-between">
              <h1 className="text-[20px] font-bold">RecurringBills</h1>
              <div
                className="flex cursor-pointer items-center gap-2"
                onClick={() => router.push("/recurring-bills")}
              >
                <p className="text-[14px] text-grey-500">See Details</p>
                <Image
                  src="/assets/icon-caret-right.svg"
                  alt="right-caret"
                  height={6}
                  width={6}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border-l-4 border-customGreen bg-beige-100">
                <div className="flex items-center justify-between p-3">
                  <p className="text--grey-500 text-[14px]">Paid Bills</p>
                  <p className="text-[14px] font-bold text-grey-900">
                    ${paid.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-[#F2CDAC] bg-beige-100">
                <div className="flex items-center justify-between p-3">
                  <p className="text--grey-500 text-[14px]">Total Upcoming</p>
                  <p className="text-[14px] font-bold text-grey-900">
                    ${upcoming.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="rounded-lg border-l-4 border-[#82C9D7] bg-beige-100">
                <div className="flex items-center justify-between p-3">
                  <p className="text--grey-500 text-[14px]">Due Soon</p>
                  <p className="text-[14px] font-bold text-grey-900">
                    ${dueSoon.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
