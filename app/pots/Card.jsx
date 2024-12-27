import React, { useState } from "react";
import CustomDropdown from "@/app/components/ui/CustomDropdown";
import Button from "../components/ui/Button";
import CustomModal from "../components/ui/CustomModal";
import PotsForm from "./PotsForm";
import { useAppDispatch } from "@/lib/hooks";
import { addMoneyOrWithdrawToBalance } from "@/lib/features/finance/financeSlice";
import { toast } from "react-toastify";

function Card({ theme = "#dddfee", name, target, total, id }) {
  const percentage = (total / +target) * 100;
  const [amount, setAmount] = useState(0);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPotModalVisible, setIsPotModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const dispatch = useAppDispatch();

  function handleClose() {
    setModalVisible(false);
  }

  function handleButton(value) {
    setSelectedButton(value);
    setModalVisible(true);
  }

  function handleDropdown(value) {
    setSelectedItem(value);
    setIsPotModalVisible(true);
  }

  function handlePotClose() {
    setIsPotModalVisible(false);
  }

  return (
    <div className="rounded-xl bg-white p-6">
      <div className="space-y-3">
        {/* ======================================================== */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <div
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: theme }}
            ></div>
            <h1 className="text-[20px] font-bold text-grey-900">{name}</h1>
          </div>
          <div className="relative">
            <div className="absolute right-0 top-0">
              <CustomDropdown
                className="ml-auto"
                onChange={handleDropdown}
                isIcon
                options={[
                  { id: 1, value: "Edit Pot" },
                  {
                    id: 2,
                    value: "Delete Pot",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        {/* ================================================== */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-grey-500">Total Saved</p>
          <p className="text-[20px] font-bold text-grey-900">$ {total}.00</p>
        </div>
        {/* ================================================== */}
        <div
          className="flex h-4 w-full overflow-hidden rounded-full bg-beige-100"
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full text-center text-xs text-white transition duration-500"
            style={{ width: `${percentage}%`, backgroundColor: theme }}
          ></div>
        </div>
        {/* ================================================== */}

        <div className="flex items-center justify-between text-xs text-grey-500">
          <p className="font-semibold">{percentage.toFixed(2)}%</p>
          <p>Target of ${target}</p>
        </div>
        {/* ================================================== */}

        <div className="mt-4 flex w-full gap-4">
          <Button
            className="flex-1 bg-beige-100 text-xs text-grey-900 shadow-customBoxShadow"
            onClick={() => handleButton("add")}
          >
            Add Money
          </Button>
          <Button
            className="flex-1 bg-beige-100 text-xs text-grey-900 shadow-customBoxShadow"
            onClick={() => handleButton("withdraw")}
          >
            Withdraw
          </Button>
        </div>
        {/* ================================================== */}
      </div>
      {/* ================================================== */}
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleClose}
        title={
          selectedButton === "add"
            ? `Add to '${name}'`
            : `Withdraw from ${name}`
        }
      >
        <div className="space-y-2">
          <p className="text-xs text-grey-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            commodi dolorum placeat nostrum nobis facilis fuga amet quos dolore
            quod!
          </p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-grey-500">New Amount</p>
            <p className="text-[20px] font-bold text-grey-900">
              ${selectedButton === "add" ? +total + +amount : +total - +amount}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-xs text-grey-500">
              Amount to {selectedButton === "add" ? "Add" : "Withdraw"}
            </label>
            <input
              type="text"
              value={amount}
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$ e.g. 2000"
              className="w-full rounded-lg border border-solid border-beige-500 bg-white p-2 text-[14px]"
            />
          </div>
          <Button
            className="w-full text-center"
            onClick={() => {
              dispatch(
                addMoneyOrWithdrawToBalance({
                  type: selectedButton,
                  amount,
                  id,
                }),
              );
              setModalVisible(false);
            }}
          >
            {selectedButton === "add" ? "Confirm Addition" : "Confirm Withdraw"}{" "}
          </Button>
        </div>
      </CustomModal>

      <CustomModal
        isVisible={isPotModalVisible}
        onClose={handlePotClose}
        title={selectedItem === "Edit Pot" ? "Edit Pot" : `Delete ${name}`}
      >
        {selectedItem === "Edit Pot" ? (
          <PotsForm handleClose={handlePotClose} isEdit={true} potID={id} />
        ) : (
          <div className="flex flex-col gap-2">
            <p>
              Are you sure you want to delete this pot? This action cannot be
              reversed, and all the data inside it will be removed forever.
            </p>
            <Button
              className="bg-customRed text-xs text-white"
              onClick={() => {
                dispatch(deleteBudgetCategory(id));
                toast.success("deleted pot successfully");
              }}
            >
              Yes, Confirmation Deletion
            </Button>
            <Button
              className="bg-transparent text-xs text-grey-500"
              onClick={handlePotClose}
            >
              No,Go Back
            </Button>
          </div>
        )}
      </CustomModal>
    </div>
  );
}

export default Card;
