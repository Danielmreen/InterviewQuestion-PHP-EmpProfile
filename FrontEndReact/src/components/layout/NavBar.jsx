export function Navbar({ activeTab, onTabChange }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span>🏢</span> Employee Management System Portal
      </div>
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === "form" ? "active" : ""}`}
          onClick={() => onTabChange("form")}
        >
          ➕ Add Employee
        </button>
        <button
          className={`nav-tab ${activeTab === "list" ? "active" : ""}`}
          onClick={() => onTabChange("list")}
        >
          👥 Directory
        </button>
      </div>
    </nav>
  );
}