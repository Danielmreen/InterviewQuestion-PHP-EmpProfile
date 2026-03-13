import { EmployeeForm } from "../components/employee/EmployeeForm";

export function AddEmployeePage({ onSuccess, showToast }) {
  return (
    <div className="page">
      <div className="card">
        <div className="card-header">
          <h2>➕ Add New Employee</h2>
          <p>
            Fill in all required fields marked with{" "}
            <span style={{ color: "var(--danger)" }}>*</span>
          </p>
        </div>
        <div className="card-body">
          <EmployeeForm onSuccess={onSuccess} showToast={showToast} />
        </div>
      </div>
    </div>
  );
}