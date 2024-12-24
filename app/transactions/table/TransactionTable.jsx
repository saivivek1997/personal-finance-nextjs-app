import TransactionRow from "./TableRow";

const TransactionTable = ({ transactions, TABLE_HEADERS }) => (
  <table className="divide-y-[1px] divide-grey-100 table-auto w-full mb-4">
    <thead className="text-left">
      <tr>
        {TABLE_HEADERS.map(({ id, headerName }) => (
          <th key={id} className="text-xs font-normal text-grey-500 pb-2">
            {headerName}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y-[1px] divide-grey-100">
      {transactions.map((transaction, index) => (
        <TransactionRow
          key={`${transaction.name}-${index}`}
          transaction={transaction}
        />
      ))}
    </tbody>
  </table>
);

export default TransactionTable;
