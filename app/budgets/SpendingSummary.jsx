import React from "react";

const SpendingSummary = ({ data, backgroundColors, labels, maximum }) => {
  return (
    <div className="flex justify-between  items-center p-4">
      <div className="flex gap-4 items-center">
        <div
          className={` h-[24px] w-1 rounded-sm`}
          style={{ background: backgroundColors }}
        ></div>
        <p className="text-[14px] text-grey-500">{labels}</p>
      </div>
      <div>
        <span className="text-base text-grey-900 font-bold">${data}</span>
        <span className="text-xs text-grey-500"> of ${maximum}</span>
      </div>
    </div>
  );
};

export default SpendingSummary;
