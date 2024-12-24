function TransactionsLayout({ children }) {
  return (
    <div className="bg-beige-100 pb-4">
      <h1 className="p-3 text-3xl font-bold text-grey-900">Transactions</h1>
      <div className=" mx-auto min-h-screen max-w-5xl  ">{children}</div>
    </div>
  );
}

export default TransactionsLayout;
