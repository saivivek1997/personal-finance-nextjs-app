import { useAppSelector } from "@/lib/hooks";

function useRecurringBillsData() {
  const { financeData } = useAppSelector((state) => state.finance);

  const recurringBills = financeData.transactions.filter(
    (trans) => trans.recurring
  );
  const requiredDate = new Date(financeData.transactions[0].date).getDate();
  const newMaxDate = requiredDate + 5;

  const paid = recurringBills
    .filter((trans) => {
      return new Date(trans.date).getMonth() === 7;
    })
    .map((trans) => ({ ...trans, isPaid: true }));

  const dueSoon = recurringBills
    .filter((trans) => {
      return (
        new Date(trans.date).getDate() >= requiredDate &&
        new Date(trans.date).getDate() <= newMaxDate &&
        new Date(trans.date).getMonth() === 6
      );
    })
    .map((trans) => ({ ...trans, isDueSoon: true }));

  const upcoming = recurringBills
    .filter((trans) => {
      const transactionDate = new Date(trans.date);
      return (
        transactionDate.getMonth() === 6 &&
        transactionDate.getDate() > newMaxDate
      );
    })
    .map((trans) => ({ ...trans, isUpcoming: true }));

  const recurringTotalCounts = {
    paid: paid.reduce((acc, curr) => Math.abs(acc) + Math.abs(curr.amount), 0),
    paidCount: paid.length,
    dueSoon: dueSoon.reduce(
      (acc, curr) => Math.abs(acc) + Math.abs(curr.amount),
      0
    ),
    dueSoonCount: dueSoon.length,
    upcoming: upcoming.reduce(
      (acc, curr) => Math.abs(acc) + Math.abs(curr.amount),
      0
    ),
    upcomingCount: upcoming.length,
  };
  return {
    recurringTotalCounts,
    paid,
    dueSoon,
    upcoming,
  };
}

export default useRecurringBillsData;
