"use client";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "../components/avatar";
import { getCustomFormat } from "@/utils/customDate";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import CustomModal from "@/app/components/ui/CustomModal";
import BudgetForm from "@/app/budgets/BudgetForm";

function LatestSpending({ category, id }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const { budgetData } = useAppSelector((state) => state.finance);

  function handleClose() {
    setModalVisible(false);
  }

  return (
    <div className="rounded-xl bg-beige-100 px-4 py-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-base text-grey-900 font-bold">Latest Spending</h1>
        <div className="flex gap-2 items-center">
          <p
            className="text-grey-500 text-[14px] cursor-pointer"
            onClick={() => router.push(`/transactions?category=${category}`)}
          >
            See All
          </p>
          <Image
            src="./assets/icon-caret-right.svg"
            alt="right-icon"
            width="6"
            height="6"
          />
          {/* <Button onClick={() => setModalVisible(true)}>Edit </Button> */}
        </div>
      </div>
      {/*
      =============== */}
      <div className="divide-y-[1px] divide-grey-500 divide-opacity-15 space-y-2 ">
        {budgetData
          .find((bdgData) => bdgData.id === id)
          ?.latestThreeTransaction.map(
            ({ name, avatar, amount, date }, index) => (
              <div className="flex justify-between p-2" key={index}>
                <div className="flex gap-2 items-center">
                  <Avatar img={avatar} />
                  <p className="text-xs md:text-base">{name}</p>
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
            )
          )}
      </div>
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleClose}
        title="Edit New Budget"
      >
        <BudgetForm handleClose={handleClose} isEdit={true} budgetID={id} />
      </CustomModal>
    </div>
  );
}

export default LatestSpending;
