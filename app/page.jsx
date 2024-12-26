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
    [financeData]
  );
  const {
    recurringTotalCounts: { paid, upcoming, dueSoon },
  } = useRecurringBillsData();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    financeData.budgets.forEach(({ id, category, maximum, theme }) =>
      dispatch(setBudgetData({ id, category, maximum, theme }))
    );
  }, []);

  return (
    <div className="bg-beige-100 min-h-screen p-4 ">
      <div className="grid grid-cols-3 gap-4 mb-3">
        <div className="bg-grey-900 text-white rounded-xl p-4 space-y-2">
          <p className="text-[14px] font-[400]">Current Balance</p>
          <p className="font-bold text-3xl">${financeData.balance.current}</p>
        </div>
        <div className="bg-white  rounded-xl p-4 space-y-2">
          <p className="text-[14px] font-[400] text-grey-500">
            Current Balance
          </p>
          <p className="font-bold text-3xl">${financeData.balance.income}</p>
        </div>
        <div className="bg-white  rounded-xl p-4 space-y-2">
          <p className="text-[14px] font-[400]">Current Balance</p>
          <p className="font-bold text-3xl text-grey-900">
            ${financeData.balance.expenses}
          </p>
        </div>
      </div>
      {/* =============================== */}
      <div className="flex gap-2">
        <section className="space-y-2 flex-1 mb-3 ">
          <div className="bg-white rounded-xl p-4 space-y-2 mb-3">
            <div className="flex justify-between">
              <h1 className="font-bold text-[20px]">Pots</h1>
              <div className="flex gap-2 items-center ">
                <p
                  className="text-[14px] text-grey-500 cursor-pointer"
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

            <div className="flex gap-8 ">
              <div className="bg-beige-100 rounded-xl p-4 min-w-48">
                <div className="flex gap-2 items-center ">
                  <Image
                    src="/assets/icon-pot.svg"
                    alt="pot-icon"
                    width={18}
                    height={18}
                  />
                  <div className="space-y-1">
                    <p className="text-[14px] text-grey-500">Total Saved </p>
                    <p className="text-grey-900 text-2xl font-bold">
                      $ {totalPotAmount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 flex-1">
                {financeData.pots.map((pot) => (
                  <div className="flex gap-2" key={pot.id}>
                    <div
                      style={{ background: pot.theme }}
                      className=" w-1 rounded-lg"
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
          <div className="rounded-xl bg-white px-4 py-4 mb-3">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-base text-grey-900 font-bold">
                Transactions
              </h1>
              <div className="flex gap-2 items-center">
                <p
                  className="text-grey-500 text-[14px] cursor-pointer"
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

            <div className="divide-y-[1px] divide-grey-500 divide-opacity-15 space-y-2 ">
              {financeData.transactions
                .slice(0, 5)
                .map(({ name, avatar, amount, date }, index) => (
                  <div className="flex justify-between p-2" key={index}>
                    <div className="flex gap-2 items-center">
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
          <div className="rounded-xl bg-white px-4 py-4  mb-3">
            <div className="flex justify-between">
              <h1 className="font-bold text-[20px]">Budgets</h1>
              <div
                className="flex gap-2 items-center "
                onClick={() => router.push("/budgets")}
              >
                <p className="text-[14px] text-grey-500 cursor-pointer">
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <DoughnutChart />
              <div className="flex flex-col gap-2 ml-4">
                {financeData.budgets.map((budget) => (
                  <div className="flex gap-2" key={budget.id}>
                    <div
                      style={{ background: budget.theme }}
                      className=" w-1 rounded-lg"
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

          <div className="rounded-xl bg-white px-4 py-4 ">
            <div className="flex justify-between items-center mb-2">
              <h1 className="font-bold text-[20px]">RecurringBills</h1>
              <div
                className="flex gap-2 items-center cursor-pointer "
                onClick={() => router.push("/recurring-bills")}
              >
                <p className="text-[14px] text-grey-500 ">See Details</p>
                <Image
                  src="/assets/icon-caret-right.svg"
                  alt="right-caret"
                  height={6}
                  width={6}
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-beige-100 border-l-4 rounded-lg border-customGreen">
                <div className="flex justify-between p-3 items-center">
                  <p className="text--grey-500 text-[14px]">Paid Bills</p>
                  <p className="text-grey-900 text-[14px] font-bold">
                    ${paid.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="bg-beige-100 border-l-4 rounded-lg border-[#F2CDAC]">
                <div className="flex justify-between p-3 items-center">
                  <p className="text--grey-500 text-[14px]">Total Upcoming</p>
                  <p className="text-grey-900 text-[14px] font-bold">
                    ${upcoming.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="border-[#82C9D7] bg-beige-100 border-l-4 rounded-lg">
                <div className="flex justify-between p-3 items-center">
                  <p className="text--grey-500 text-[14px]">Due Soon</p>
                  <p className="text-grey-900 text-[14px] font-bold">
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
