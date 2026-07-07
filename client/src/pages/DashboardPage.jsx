import { useState } from "react";
import ConnectBankButton from "../components/ConnectBankButton";
import SummaryCard from "../components/SummaryCard";

function DashboardPage() {
  const [bankData, setBankData] = useState(null);

  const achAccount = bankData?.numbers?.ach?.[0] ?? null;

  return (
    <section className="dashboard-content">
      <h1>Dashboard</h1>
      <p>Welcome Back ☺️</p>

      <SummaryCard account={achAccount} />

      <ConnectBankButton onBankDataLoaded={setBankData} />
    </section>
  );
}

export default DashboardPage;
