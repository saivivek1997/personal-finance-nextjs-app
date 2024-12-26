import Avatar from "@/app/components/avatar";
import { cn } from "@/app/lib/cn";
import { getCustomFormat } from "@/utils/customDate";
import Image from "next/image";

const TransactionRow = ({ transaction, isRecurring }) => {
  const { name, category, date, amount, avatar, isPaid, isDueSoon } =
    transaction;
  const transactionDate = new Date(date);

  return (
    <tr>
      <td className="flex items-center gap-2 p-3">
        <Avatar img={avatar} />
        <p className="text-[14px] font-bold text-grey-900">{name}</p>
      </td>

      {isRecurring ? (
        <td
          className={cn(
            "text-xs font-normal text-grey-500",
            isPaid && "text-customGreen"
          )}
        >
          <div className="flex gap-2 items-center">
            Monthly-{transactionDate.getDate()}{" "}
            {isPaid && (
              <Image
                src="/assets/icon-bill-paid.svg"
                alt="paid-icon"
                height={12}
                width={12}
              />
            )}
            {isDueSoon && (
              <Image
                src="/assets/icon-bill-due.svg"
                alt="dueSoon-icon"
                height={12}
                width={12}
              />
            )}
          </div>
        </td>
      ) : (
        <td className="text-xs font-normal text-grey-500">{category} </td>
      )}

      {!isRecurring && (
        <td className="text-xs font-normal text-grey-500">
          {getCustomFormat(date)}
        </td>
      )}
      <td
        className={cn(
          "text-xs font-[900]",
          amount > 0 ? "text-customGreen" : "text-gray-900"
        )}
      >
        <span>{amount > 0 ? "+" : "-"}</span> ${Math.abs(amount)}
      </td>
    </tr>
  );
};

export default TransactionRow;
