import React from "react";
import { cn } from "../lib/cn";

function Custom({ heading, value, className, color }) {
  return (
    <div className={cn("flex gap-4", className)}>
      <div
        className={cn(`w-1 h-full rounded-[4px]`)}
        style={{ background: color }}
      >
        {" "}
      </div>
      <div className="space-y-1 ">
        <p className="text-xs text-grey-500">{heading}</p>
        <p className="text-[14px] text-grey-900 font-bold">{value}</p>
      </div>
    </div>
  );
}

function UtilizationMoney({ spentMoney, maximumMoney, theme }) {
  return (
    <div className="flex ">
      <Custom
        heading="Spent"
        value={spentMoney}
        className="w-1/2 "
        color={theme}
      />
      <Custom
        heading="Remaining"
        value={maximumMoney}
        className="w-1/2"
        color="#f8f4f0"
      />
    </div>
  );
}

export default UtilizationMoney;
