"use client";
import React, { useState } from "react";
import Button from "../components/ui/Button";
import Card from "./Card";
import { useAppSelector } from "@/lib/hooks";
import CustomModal from "../components/ui/CustomModal";
import PotsForm from "./PotsForm";

function PotsPage() {
  const { financeData } = useAppSelector((state) => state.finance);
  const [isModalVisible, setModalVisible] = useState(false);

  function handleClose() {
    setModalVisible(false);
  }

  return (
    <div className="bg-beige-100 p-4 min-h-screen ">
      <div className="flex justify-between items-center mb-2">
        <h1>Pots</h1>
        <Button
          className="disabled:opacity-20 disabled:cursor-not-allowed disabled:pointer-events-none"
          onClick={() => setModalVisible(true)}
        >
          {" "}
          Add New Pot
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {financeData.pots.map((pot) => (
          <Card key={pot.id} {...pot} />
        ))}
      </div>
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleClose}
        title="Add New Pot "
      >
        <PotsForm handleClose={handleClose} />
      </CustomModal>
    </div>
  );
}

export default PotsPage;
