import { cn } from "@/app/lib/cn";

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={cn(
        "bg-grey-900 rounded-lg p-3  text-[14px] font-bold text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
