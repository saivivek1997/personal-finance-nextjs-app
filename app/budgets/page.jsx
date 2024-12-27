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
    <div className="mb-6 bg-beige-100 p-4 md:mb-0 md:p-9">
      <div className="mb-3 flex items-center justify-between">
        <h1>Budgets</h1>
        <Button
          onClick={() => setModalVisible(true)}
          disabled={unUsedCategories.length === 0}
          className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-20"
        >
          {" "}
          Add New Budget
        </Button>
      </div>
      {/*==================================================================*/}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <div className="w-full space-y-4 rounded-xl bg-white p-8">
            <div className="mt-12 flex justify-center">
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
