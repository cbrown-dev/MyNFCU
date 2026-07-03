import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <a href="#" className="sidebar__link active">
          Dashboard
        </a>

        <a href="#" className="sidebar__link">
          Accounts
        </a>

        <a href="#" className="sidebar__link">
          Transactions
        </a>

        <a href="#" className="sidebar__link">
          Budgets
        </a>

        <a href="#" className="sidebar__link">
          Investments
        </a>

        <a href="#" className="sidebar__link">
          Settings
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
