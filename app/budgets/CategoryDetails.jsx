import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import UtilizationMoney from "./UtilizationMoney";
import LatestSpending from "./LatestSpending";
import {
  deleteBudgetCategory,
  setBudgetData,
} from "@/lib/features/finance/financeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import CustomModal from "../components/ui/CustomModal";
import CustomDropdown from "@/app/components/ui/CustomDropdown";
import BudgetForm from "./BudgetForm";
import Button from "../components/ui/Button";
import { toast } from "react-toastify";

function CategoryDetails({ id, category, maximum, theme }) {
  console.log("CategoryDetails page loaded");
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const { budgetData } = useAppSelector((state) => state.finance);
  const spentMoney = budgetData.find((bdgt) => bdgt.id === id)?.spentMoney;
  const percentage = budgetData.find((bdgt) => bdgt.id === id)?.percentage;

  useEffect(() => {
    console.log("CategoryDetails useEffect");
    dispatch(setBudgetData({ id, category, maximum, theme }));
  }, [id, category, maximum, theme]);

  function handleClose() {
    setModalVisible(false);
  }

  function handleDropdown(value) {
    setSelectedItem(value);
    setModalVisible(true);
  }

  return (
    <div className="w-full space-y-3 rounded-xl bg-white p-8">
      {/* =============== */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: theme }}
          ></div>
          <h1 className="text-[20px] font-bold text-grey-900">{category}</h1>
        </div>
        <div className="relative">
          <div className="absolute right-0 top-0">
            <CustomDropdown
              className="ml-auto"
              onChange={handleDropdown}
              isIcon
              options={[
                { id: 1, value: "Edit Budget" },
                {
                  id: 2,
                  value: "Delete Budget",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <p className="text-[14px] text-grey-500">Maximum of ${maximum}</p>
      <ProgressBar theme={theme} percentage={percentage} />
      <UtilizationMoney
        maximumMoney={maximum}
        theme={theme}
        spentMoney={spentMoney}
      />
      <LatestSpending category={category} id={id} />
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleClose}
        title={
          selectedItem === "Edit Budget" ? "Edit Budget" : `Delete ${category}`
        }
      >
        {selectedItem === "Edit Budget" ? (
          <BudgetForm handleClose={handleClose} isEdit={true} budgetID={id} />
        ) : (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-grey-500">
              Are you sure you want to delete this budget? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </p>
            <Button
              className="bg-customRed text-xs text-white"
              onClick={() => {
                dispatch(deleteBudgetCategory(id));
                toast.success("deleted budget successfully");
              }}
            >
              Yes, Confirmation Deletion
            </Button>
            <Button
              className="bg-transparent text-xs text-grey-500"
              onClick={handleClose}
            >
              No,Go Back
            </Button>
          </div>
        )}
      </CustomModal>
    </div>
  );
}

export default CategoryDetails;
