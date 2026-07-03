import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <h2>Pattern</h2>
      </div>

      <div className="navbar__actions">
        <button className="navbar__icon" aria-label="Notifications">
          🔔
        </button>

        <button className="navbar__profile">
          <span className="navbar__avatar">CB</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
