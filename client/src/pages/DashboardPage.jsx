import { useState } from "react";
import ConnectBankButton from "../components/ConnectBankButton";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";

function DashboardPage() {
  const [bankData, setBankData] = useState(null);

  const transactions = bankData?.transactions ?? [];
  const accounts = bankData?.accounts ?? [];

  // Balance Metrics
  const currentBalance = accounts.reduce(
    (sum, account) => sum + (account.balances.current ?? 0),
    0,
  );

  const availableBalance = accounts.reduce(
    (sum, account) => sum + (account.balances.available ?? 0),
    0,
  );

  // Spending Metrics
  const spending = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const income = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  // Spending by Category
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    if (transaction.amount < 0) return;

    const category = transaction.personal_finance_category?.primary ?? "OTHER";

    categoryTotals[category] =
      (categoryTotals[category] || 0) + transaction.amount;
  });

  return (
    <section className="dashboard-content">
      <h1>Dashboard</h1>
      <p>Welcome Back 👋</p>

      {/* Temporary Summary Card */}
      <SummaryCard
        account={{
          account: `$${currentBalance.toFixed(2)}`,
          routing: `$${availableBalance.toFixed(2)}`,
          wire_routing: `$${spending.toFixed(2)}`,
        }}
      />

      <p>
        <strong>Income (30 Days):</strong> ${income.toFixed(2)}
      </p>

      <ConnectBankButton onBankDataLoaded={setBankData} />

      <TransactionTable transactions={transactions} />
    </section>
  );
}

export default DashboardPage;
