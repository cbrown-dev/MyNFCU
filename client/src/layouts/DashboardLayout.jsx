import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ConnectBankButton from "../components/ConnectBankButton";

function DashboardLayout() {
  return (
    <>
      <Navbar />

      <main className="dashboard-layout">
        <Sidebar />

        <section className="dashboard-content">
          <ConnectBankButton />
        </section>
      </main>
    </>
  );
}

export default DashboardLayout;
