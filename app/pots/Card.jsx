import React, { useState } from "react";
import CustomDropdown from "@/app/components/ui/CustomDropdown";
import Button from "../components/ui/Button";
import CustomModal from "../components/ui/CustomModal";
import PotsForm from "./PotsForm";
import { useAppDispatch } from "@/lib/hooks";
import { addMoneyOrWithdrawToBalance } from "@/lib/features/finance/financeSlice";

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
    <div className="bg-white p-6  rounded-xl ">
      <div className="space-y-3">
        {/* ======================================================== */}
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div
              className="w-4 h-4 rounded-full "
              style={{ backgroundColor: theme }}
            ></div>
            <h1 className="text-[20px] font-bold text-grey-900">{name}</h1>
          </div>
          <div className="relative ">
            <div className=" absolute  top-0 right-0 ">
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
        <div className="flex justify-between items-center">
          <p className="text-grey-500 text-sm">Total Saved</p>
          <p className="text-grey-900 text-[20px] font-bold">$ {total}.00</p>
        </div>
        {/* ================================================== */}
        <div
          className="flex w-full h-4 bg-beige-100 rounded-full overflow-hidden "
          role="progressbar"
          aria-valuenow="25"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500"
            style={{ width: `${percentage}%`, backgroundColor: theme }}
          ></div>
        </div>
        {/* ================================================== */}

        <div className="flex justify-between items-center text-xs text-grey-500">
          <p className="font-semibold">{percentage.toFixed(2)}%</p>
          <p>Target of ${target}</p>
        </div>
        {/* ================================================== */}

        <div className="flex gap-4 mt-4 w-full  ">
          <Button
            className="bg-beige-100  text-grey-900 shadow-customBoxShadow text-xs flex-1"
            onClick={() => handleButton("add")}
          >
            Add Money
          </Button>
          <Button
            className="bg-beige-100 text-grey-900 shadow-customBoxShadow text-xs flex-1"
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
          <p className="text-grey-500 text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus,
            commodi dolorum placeat nostrum nobis facilis fuga amet quos dolore
            quod!
          </p>
          <div className="flex justify-between items-center">
            <p className="text-grey-500 text-xs">New Amount</p>
            <p className="text-grey-900 text-[20px] font-bold">
              ${selectedButton === "add" ? +total + +amount : +total - +amount}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-grey-500  text-xs">
              Amount to {selectedButton === "add" ? "Add" : "Withdraw"}
            </label>
            <input
              type="text"
              value={amount}
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$ e.g. 2000"
              className="w-full rounded-lg border border-solid border-beige-500 bg-white p-2 text-[14px] "
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
                })
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
              onClick={() => dispatch(deleteBudgetCategory(id))}
            >
              Yes, Confirmation Deletion
            </Button>
            <Button
              className="bg-transparent text-grey-500 text-xs"
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
