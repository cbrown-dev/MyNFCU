function TransactionTable({ transactions }) {
  if (!transactions.length) {
    return <p>No transactions found.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Merchant</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.transaction_id}>
            <td>{transaction.date}</td>

            <td>{transaction.merchant_name || transaction.name}</td>

            <td>{transaction.personal_finance_category?.primary || "Other"}</td>

            <td>${transaction.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
