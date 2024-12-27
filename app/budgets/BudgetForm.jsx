import Button from "@/app/components/ui/Button";
import React, { useState } from "react";
import DropDown from "@/app/components/ui/CustomDropdown";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addBudgetDataInFinanceData,
  editBudgetDataInFinanceData,
} from "@/lib/features/finance/financeSlice";
import useUnusedCategories from "@/hooks/useUnusedCategories";

export const themes = [
  { id: 1, theme: "Teal Green", value: "#277C78" },
  { id: 2, theme: "Soft Peach", value: "#F2CDAC" },
  { id: 3, theme: "Sky Blue", value: "#82C9D7" },
  { id: 4, theme: "Slate Gray", value: "#626070" },
  { id: 5, theme: "Brick Red", value: "#C94736" },
  { id: 6, theme: "Lavender Purple", value: "#826CB0" },
  { id: 7, theme: "Orchid", value: "#AF81BA" },
  { id: 8, theme: "Sea Green", value: "#597C7C" },
  { id: 9, theme: "Rust Brown", value: "#93674F" },
  { id: 10, theme: "Rosewood", value: "#934F6F" },
  { id: 11, theme: "Azure Blue", value: "#3F82B2" },
  { id: 12, theme: "Steel Gray", value: "#97A0AC" },
  { id: 13, theme: "Olive Green", value: "#7F9161" },
  { id: 14, theme: "Goldenrod", value: "#CAB361" },
  { id: 15, theme: "Burnt Sienna", value: "#BE6C49" },
];
function BudgetForm({ isEdit, budgetID, handleClose }) {
  const { financeData } = useAppSelector((state) => state.finance);

  const budgetObj = financeData.budgets.find(
    (budget) => budget.id === budgetID,
  );
  const {
    unUsedCategories,
    unUsedThemes,
    handleChange,
    handleCategoryChange,
    handleThemeChange,
    formDetails,
    setInitialValueOfCategory,
    setInitialValueOfTheme,
  } = useUnusedCategories(() =>
    budgetObj
      ? budgetObj
      : {
          id: 0,
          category: null,
          maximum: "0",
          theme: null,
        },
  );

  const dispatch = useAppDispatch();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isEdit) {
          dispatch(
            addBudgetDataInFinanceData({
              ...formDetails,
              id: crypto.randomUUID(),
            }),
          );
        } else {
          dispatch(editBudgetDataInFinanceData({ ...formDetails }));
        }
        handleClose();
      }}
      className="space-y-3"
    >
      <p className="text-[14px] text-grey-500">
        Choose a category to set a spending budget. These categories can help
        you monitor spending.
      </p>
      <div className="space-y-2">
        <label className="text-xs text-grey-500">Category</label>
        <DropDown
          options={unUsedCategories}
          onChange={handleCategoryChange}
          onIntialValue={setInitialValueOfCategory}
          isEdit={isEdit}
          selected={formDetails.category}
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-grey-500">Maximum Spent</label>
        <input
          onChange={handleChange}
          type="text"
          value={formDetails.maximum.toString()}
          placeholder="$ e.g. 2000"
          className="w-full rounded-lg border border-solid border-beige-500 bg-white p-3 text-[14px]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-grey-500"> Theme</label>
        <DropDown
          options={unUsedThemes}
          isTheme
          onChange={handleThemeChange}
          onIntialValue={setInitialValueOfTheme}
          isEdit={isEdit}
          selected={
            themes?.find((theme) => theme.value === formDetails.theme)?.theme
          }
        />
      </div>

      <Button className="w-full text-center">
        {isEdit ? "Edit Budget" : "Add Budget"}
      </Button>
    </form>
  );
}

export default BudgetForm;
