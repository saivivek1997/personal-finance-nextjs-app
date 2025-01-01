import React from "react";
import { cn } from "@/app/lib/cn";

function ProgressBar({ percentage = 90, theme, className }) {
  return (
    <div className="relative h-7 w-full overflow-hidden rounded-[4px] bg-beige-100">
      <div
        className={cn(
          "absolute left-0 top-[3px] h-[75%] w-full rounded-[4px]",
          className,
        )}
        style={{ width: `${percentage}%`, backgroundColor: theme }}
      ></div>
    </div>
  );
}

export default ProgressBar;
