"use client";

import React from "react";
import DropDown from "../components/ui/CustomDropdown";
import Button from "../components/ui/Button";
import useUnusedCategories from "@/hooks/useUnusedCategories";
import { themes } from "../budgets/BudgetForm";
import { addNewPot, editNewPot } from "@/lib/features/finance/financeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

function PotsForm({ isEdit, handleClose, potID }) {
  const { financeData } = useAppSelector((state) => state.finance);

  const potsData = financeData.pots.find((pot) => pot.id === potID);

  const {
    unUsedThemes,
    handleThemeChange,
    setInitialValueOfTheme,
    formDetails,
    setFormDetails,
  } = useUnusedCategories(() =>
    potsData
      ? potsData
      : {
          id: 0,
          name: "",
          target: "",
          theme: null,
          total: 0,
        }
  );

  const dispatch = useAppDispatch();

  function handleChange(event) {
    setFormDetails((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!isEdit) {
          dispatch(
            addNewPot({
              ...formDetails,
              id: crypto.randomUUID(),
            })
          );
        } else {
          dispatch(editNewPot({ ...formDetails }));
        }
        handleClose();
      }}
      className="space-y-3"
    >
      <p className="text-grey-500 text-[14px]">
        {!isEdit
          ? "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
          : "If your saving targets change, feel free to update your pots."}
      </p>
      <div className="space-y-2">
        <label className="text-grey-500 text-xs">Pot Name</label>
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={formDetails.name}
          placeholder="$ e.g. Rainy Days"
          className="w-full rounded-lg border border-solid border-beige-500 bg-white p-3 text-[14px] "
        />
      </div>

      <div className="space-y-2">
        <label className="text-grey-500  text-xs">Maximum Spent</label>
        <input
          onChange={handleChange}
          type="text"
          value={formDetails.target}
          placeholder="$ e.g. 2000"
          name="target"
          className="w-full rounded-lg border border-solid border-beige-500 bg-white p-3 text-[14px] "
        />
      </div>

      <div className="space-y-2">
        <label className="text-grey-500  text-xs"> Theme</label>
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
        {isEdit ? "Save Changes" : "Add Pot "}
      </Button>
    </form>
  );
}

export default PotsForm;
