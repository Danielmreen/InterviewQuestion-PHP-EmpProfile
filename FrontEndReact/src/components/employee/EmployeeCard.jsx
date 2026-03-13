import { getInitials, formatDate } from "../../utils/formatters";

export function EmployeeCard({ employee, onClick }) {
  return (
    <div className="emp-card" onClick={() => onClick(employee)}>
      <div className="emp-card-top">
        <div className="avatar">{getInitials(employee.fullName)}</div>
        <div>
          <div className="emp-name">{employee.fullName}</div>
          <div className="emp-title">{employee.jobTitle}</div>
        </div>
      </div>

      <div className="emp-meta">
        <div className="meta-item">
          <div className="meta-label">📧 Email</div>
          <div className="meta-val">{employee.email}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">📱 Phone</div>
          <div className="meta-val">{employee.phone}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">📅 Hire Date</div>
          <div className="meta-val">{formatDate(employee.hireDate)}</div>
        </div>
        <div className="meta-item">
          <div className="meta-label">🌍 Nationality</div>
          <div className="meta-val">{employee.nationality}</div>
        </div>
      </div>

      <span className="dept-badge">{employee.department}</span>
    </div>
  );
}