import { useState } from "react";
import { useEmployees }    from "../hooks/useEmployees";
import { EmployeeCard }    from "../components/employee/EmployeeCard";
import { EmployeeModal }   from "../components/employee/EmployeeModal";

export function EmployeeListPage({ refresh }) {
  const { employees, loading, error } = useEmployees(refresh);
  const [search,     setSearch]       = useState("");
  const [deptFilter, setDeptFilter]   = useState("All");
  const [selected,   setSelected]     = useState(null);

  const usedDepts = ["All", ...new Set(employees.map((e) => e.department))];

  const visible = employees.filter((emp) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      emp.fullName.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.jobTitle.toLowerCase().includes(q);
    const matchDept = deptFilter === "All" || emp.department === deptFilter;
    return matchSearch && matchDept;
  });

  if (loading) return (
    <div className="page">
      <div className="empty-state"><div className="icon">⏳</div><h3>Loading employees…</h3></div>
    </div>
  );

  if (error) return (
    <div className="page">
      <div className="empty-state"><div className="icon">❌</div><h3>{error}</h3></div>
    </div>
  );

  return (
    <div className="page">

      <div className="list-header">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h2>👥 Employee Directory</h2>
          <span className="badge-count">{employees.length} total</span>
        </div>
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="input"
            placeholder="Search employees…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {employees.length > 0 && (
        <div className="filter-bar">
          {usedDepts.map((dept) => (
            <button
              key={dept}
              className={`filter-chip ${deptFilter === dept ? "active" : ""}`}
              onClick={() => setDeptFilter(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="empty-state">
          <div className="icon">{employees.length === 0 ? "🏢" : "🔍"}</div>
          <h3>{employees.length === 0 ? "No employees yet" : "No results found"}</h3>
          <p>
            {employees.length === 0
              ? "Add your first employee using the Add Employee tab."
              : "Try adjusting your search or filter."}
          </p>
        </div>
      ) : (
        <div className="emp-grid">
          {visible.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} onClick={setSelected} />
          ))}
        </div>
      )}

      <EmployeeModal employee={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
