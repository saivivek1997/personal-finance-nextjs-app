"use client";
import React, { useState } from "react";
import CategoryDetails from "./CategoryDetails";
import DoughnutChart from "./BudgetChart";
import SpendingSummary from "@/app/budgets/SpendingSummary";
import Button from "@/app/components/ui/Button";
import CustomModal from "@/app/components/ui/CustomModal";
import { useAppSelector } from "@/lib/hooks";
import BudgetForm from "@/app/budgets/BudgetForm";
import useUnusedCategories from "@/hooks/useUnusedCategories";
// import { unUsedCategories } from "../transactions/CONSTANTS";

function BudgetPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const { financeData, budgetData } = useAppSelector((state) => state.finance);
  const { unUsedCategories } = useUnusedCategories();

  function handleClose() {
    setModalVisible(false);
  }

  return (
    <div className="bg-beige-100 p-9">
      <div className="flex justify-between items-center mb-3">
        <h1>Budgets</h1>
        <Button
          onClick={() => setModalVisible(true)}
          disabled={unUsedCategories.length === 0}
          className="disabled:opacity-20 disabled:cursor-not-allowed disabled:pointer-events-none"
        >
          {" "}
          Add New Budget
        </Button>
      </div>
      {/*==================================================================*/}
      <div className=" grid grid-cols-2 gap-4">
        <div>
          <div className="rounded-xl bg-white p-8 w-full space-y-4">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <DoughnutChart />
            </div>
            <div className="divide-y-[1px] divide-beige-100">
              {budgetData.map((item, index) => (
                <SpendingSummary
                  key={item.id}
                  data={item.spentMoney}
                  backgroundColors={item.theme}
                  labels={item.category}
                  maximum={item.maximum}
                />
              ))}
            </div>
            {/*============================*/}
          </div>
        </div>

        {/*======================*/}
        <div className="space-y-4">
          {financeData.budgets.map((budget, index) => (
            <CategoryDetails key={budget.id} {...budget} />
          ))}
        </div>
      </div>

      <CustomModal
        isVisible={isModalVisible}
        onClose={handleClose}
        title="Add New Budget"
      >
        <BudgetForm handleClose={handleClose} />
      </CustomModal>
    </div>
  );
}

export default BudgetPage;
