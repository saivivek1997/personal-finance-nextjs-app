import React from "react";
import { cn } from "@/app/lib/cn";

function ProgressBar({ percentage = 90, theme, className }) {
  return (
    <div className="relative rounded-[4px] bg-beige-100  w-full h-7 overflow-hidden">
      <div
        className={cn(
          "absolute  w-full h-[75%] rounded-[4px] top-[3px] left-0",
          className
        )}
        style={{ width: `${percentage}%`, backgroundColor: theme }}
      ></div>
    </div>
  );
}

export default ProgressBar;
