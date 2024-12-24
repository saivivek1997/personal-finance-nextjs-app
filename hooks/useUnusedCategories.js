import { themes } from "@/app/budgets/BudgetForm";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

function useUnusedCategories(customObj) {
  const { financeData } = useAppSelector((state) => state.finance);
  const [formDetails, setFormDetails] = useState(customObj);
  const allCategories = financeData.transactions.map((trans) => trans.category);
  const alreadyBudgetCategories = financeData.budgets.map(
    (budget) => budget.category
  );
  const unUsedCategories = [
    ...new Set(
      allCategories.filter(
        (category) => !alreadyBudgetCategories.includes(category)
      )
    ),
  ].map((category) => ({ id: category, value: category }));

  const usedThemesOfBudget = financeData.budgets.map((budget) => budget.theme);

  const unUsedThemes = themes
    .filter((theme) => !usedThemesOfBudget.includes(theme.value))
    .map((theme) => ({
      id: theme.value,
      value: theme.theme,
      theme: theme.value,
    }));

  function handleCategoryChange(category) {
    setFormDetails((prev) => ({
      ...prev,
      category,
    }));
  }

  function handleThemeChange(value) {
    setFormDetails((prev) => ({
      ...prev,
      theme: themes.find((theme) => theme.theme === value).value,
    }));
  }

  function handleChange(event) {
    const value = event.target.value;
    setFormDetails((prev) => ({
      ...prev,
      maximum: +value,
    }));
  }

  function setInitialValueOfCategory(initialValue) {
    setFormDetails((prev) => ({
      ...prev,
      category: initialValue,
    }));
  }
  function setInitialValueOfTheme(initialValue) {
    setFormDetails((prev) => ({
      ...prev,
      theme: themes.find((theme) => theme.theme === initialValue).value,
    }));
  }
  return {
    unUsedCategories,
    unUsedThemes,
    handleCategoryChange,
    handleThemeChange,
    handleChange,
    setInitialValueOfCategory,
    setInitialValueOfTheme,
    formDetails,
    setFormDetails,
  };
}

export default useUnusedCategories;
