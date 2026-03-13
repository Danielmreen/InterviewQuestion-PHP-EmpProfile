import { getInitials, formatDate } from "../../utils/formatters";

function DetailRow({ label, value, full }) {
  return (
    <div className={`detail-row${full ? " full" : ""}`}>
      <span className="lbl">{label}</span>
      <span className="val">{value || "—"}</span>
    </div>
  );
}

export function EmployeeModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="avatar" style={{ width: 40, height: 40, fontSize: 15 }}>
              {getInitials(employee.fullName)}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{employee.fullName}</div>
              <div style={{ fontSize: 12, color: "var(--neutral-500)" }}>
                {employee.jobTitle} · {employee.department}
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="detail-grid">
            <DetailRow label="Gender"           value={employee.gender} />
            <DetailRow label="Marital Status"   value={employee.maritalStatus} />
            <DetailRow label="Date of Birth"    value={formatDate(employee.dateOfBirth)} />
            <DetailRow label="Nationality"      value={employee.nationality} />
            <DetailRow label="Phone"            value={employee.phone} />
            <DetailRow label="Email"            value={employee.email} />
            <DetailRow label="Hire Date"        value={formatDate(employee.hireDate)} />
            <DetailRow label="Employment Type"  value={employee.employmentType} />
            <DetailRow label="Address"          value={employee.address} full />
            {employee.emergencyContact && (
              <DetailRow label="Emergency Contact" value={employee.emergencyContact} full />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
