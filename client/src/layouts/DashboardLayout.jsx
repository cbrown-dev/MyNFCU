import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ConnectBankButton from "../components/ConnectBankButton";

function DashboardLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Sidebar />

        <section>
          <ConnectBankButton />
        </section>
      </main>
    </>
  );
}

export default DashboardLayout;
