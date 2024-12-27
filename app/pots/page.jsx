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
    <div className="mb-12 min-h-screen bg-beige-100 p-4 md:mb-0">
      <div className="mb-2 flex items-center justify-between">
        <h1>Pots</h1>
        <Button
          className="disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-20"
          onClick={() => setModalVisible(true)}
        >
          {" "}
          Add New Pot
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
