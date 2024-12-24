import Avatar from "@/app/components/avatar";
import { cn } from "@/app/lib/cn";
import { getCustomFormat } from "@/utils/customDate";

const TransactionRow = ({ transaction }) => {
  const { name, category, date, amount, avatar } = transaction;
  return (
    <tr>
      <td className="flex items-center gap-2 p-3">
        <Avatar img={avatar} />
        <p className="text-[14px] font-bold text-grey-900">{name}</p>
      </td>
      <td className="text-xs font-normal text-grey-500">{category}</td>
      <td className="text-xs font-normal text-grey-500">
        {getCustomFormat(date)}
      </td>
      <td
        className={cn(
          "text-xs font-[900]",
          amount > 0 ? "text-customGreen" : "text-gray-900",
        )}
      >
        <span>{amount > 0 ? "+" : "-"}</span> ${Math.abs(amount)}
      </td>
    </tr>
  );
};

export default TransactionRow;
