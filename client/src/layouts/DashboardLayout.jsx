import "./DashboardLayout.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardPage from "../pages/DashboardPage";

function DashboardLayout() {
  return (
    <>
      <Navbar />

      <main className="dashboard-layout">
        <Sidebar />

        <DashboardPage />
      </main>
    </>
  );
}

export default DashboardLayout;
