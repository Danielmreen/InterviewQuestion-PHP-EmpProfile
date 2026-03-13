import { useState } from "react";
import { FieldError }  from "../common/FieldError";
import { RadioGroup }  from "../common/RadioGroup";
import { validateEmployee, isValid } from "../../utils/validation";
import { employeeService } from "../../services/employeeService";
import {
  DEPARTMENTS, EMPLOYMENT_TYPES, NATIONALITIES,
  GENDER_OPTIONS, MARITAL_OPTIONS, EMPTY_FORM,
} from "../../constants/employeeConstants";

export function EmployeeForm({ onSuccess, showToast }) {
  const [form,    setForm]    = useState(EMPTY_FORM);
  const [errors,  setErrors]  = useState({});
  const [loading, setLoading] = useState(false);

  // Generic field setter — clears its own error on change
  const setField = (key) => (value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const handleInputChange  = (key) => (e) => setField(key)(e.target.value);
  const handleSelectChange = (key) => (e) => setField(key)(e.target.value);

  const handleReset = () => { setForm(EMPTY_FORM); setErrors({}); };

  const handleSubmit = async () => {
    const clientErrors = validateEmployee(form);
    if (!isValid(clientErrors)) {
      setErrors(clientErrors);
      showToast("Please fix the errors before submitting.", "error");
      return;
    }

    setLoading(true);
    try {
      await employeeService.create(form);
      showToast("Employee added successfully!", "success");
      handleReset();
      onSuccess();
    } catch (err) {
      if (err.status === 422) {
        // Flatten Laravel's { field: ["msg"] } to { field: "msg" }
        const flat = Object.fromEntries(
          Object.entries(err.errors).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
        );
        setErrors(flat);
        showToast("Please fix the highlighted errors.", "error");
      } else {
        showToast("An unexpected error occurred.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 16);

  return (
    <div className="form-grid">

      {/* ── Personal Information ── */}
      <div className="form-section-title">Personal Information</div>

      <div className="field full">
        <label>Full Name <span className="req">*</span></label>
        <input
          className={`input ${errors.fullName ? "error" : ""}`}
          placeholder="e.g. John Doe"
          value={form.fullName}
          onChange={handleInputChange("fullName")}
        />
        <FieldError msg={errors.fullName} />
      </div>

      <div className="field">
        <label>Gender <span className="req">*</span></label>
        <RadioGroup
          options={GENDER_OPTIONS}
          value={form.gender}
          onChange={setField("gender")}
          hasError={!!errors.gender}
        />
        <FieldError msg={errors.gender} />
      </div>

      <div className="field">
        <label>Marital Status <span className="req">*</span></label>
        <RadioGroup
          options={MARITAL_OPTIONS}
          value={form.maritalStatus}
          onChange={setField("maritalStatus")}
          hasError={!!errors.maritalStatus}
        />
        <FieldError msg={errors.maritalStatus} />
      </div>

      <div className="field">
        <label>Date of Birth <span className="req">*</span></label>
        <input
          type="date"
          className={`input ${errors.dateOfBirth ? "error" : ""}`}
          max={maxDob.toISOString().split("T")[0]}
          value={form.dateOfBirth}
          onChange={handleInputChange("dateOfBirth")}
        />
        <FieldError msg={errors.dateOfBirth} />
      </div>

      <div className="field">
        <label>Nationality <span className="req">*</span></label>
        <select
          className={`select ${errors.nationality ? "error" : ""}`}
          value={form.nationality}
          onChange={handleSelectChange("nationality")}
        >
          <option value="">— Select nationality —</option>
          {NATIONALITIES.map((n) => <option key={n}>{n}</option>)}
        </select>
        <FieldError msg={errors.nationality} />
      </div>

      {/* ── Contact Information ── */}
      <div className="form-section-title">Contact Information</div>

      <div className="field">
        <label>Phone Number <span className="req">*</span></label>
        <input
          className={`input ${errors.phone ? "error" : ""}`}
          placeholder="+65 9123 4567"
          value={form.phone}
          onChange={handleInputChange("phone")}
        />
        <FieldError msg={errors.phone} />
      </div>

      <div className="field">
        <label>Email Address <span className="req">*</span></label>
        <input
          type="email"
          className={`input ${errors.email ? "error" : ""}`}
          placeholder="john@company.com"
          value={form.email}
          onChange={handleInputChange("email")}
        />
        <FieldError msg={errors.email} />
      </div>

      <div className="field full">
        <label>Home Address <span className="req">*</span></label>
        <textarea
          className={`textarea ${errors.address ? "error" : ""}`}
          placeholder="Block 123, Street Name, Singapore 123456"
          value={form.address}
          onChange={handleInputChange("address")}
        />
        <FieldError msg={errors.address} />
      </div>

      <div className="field full">
        <label>
          Emergency Contact{" "}
          <span style={{ fontSize: "11px", color: "var(--neutral-400)" }}>(Optional)</span>
        </label>
        <input
          className="input"
          placeholder="Name – Relationship – Phone"
          value={form.emergencyContact}
          onChange={handleInputChange("emergencyContact")}
        />
      </div>

      {/* ── Employment Details ── */}
      <div className="form-section-title">Employment Details</div>

      <div className="field">
        <label>Department <span className="req">*</span></label>
        <select
          className={`select ${errors.department ? "error" : ""}`}
          value={form.department}
          onChange={handleSelectChange("department")}
        >
          <option value="">— Select department —</option>
          {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
        </select>
        <FieldError msg={errors.department} />
      </div>

      <div className="field">
        <label>Job Title <span className="req">*</span></label>
        <input
          className={`input ${errors.jobTitle ? "error" : ""}`}
          placeholder="e.g. Software Engineer"
          value={form.jobTitle}
          onChange={handleInputChange("jobTitle")}
        />
        <FieldError msg={errors.jobTitle} />
      </div>

      <div className="field">
        <label>Employment Type <span className="req">*</span></label>
        <RadioGroup
          options={EMPLOYMENT_TYPES}
          value={form.employmentType}
          onChange={setField("employmentType")}
          hasError={!!errors.employmentType}
        />
        <FieldError msg={errors.employmentType} />
      </div>

      <div className="field">
        <label>Hire Date <span className="req">*</span></label>
        <input
          type="date"
          className={`input ${errors.hireDate ? "error" : ""}`}
          max={new Date().toISOString().split("T")[0]}
          value={form.hireDate}
          onChange={handleInputChange("hireDate")}
        />
        <FieldError msg={errors.hireDate} />
      </div>

      {/* ── Actions ── */}
      <div className="form-actions">
        <button className="btn btn-outline" type="button" onClick={handleReset}>
          🔄 Reset
        </button>
        <button className="btn btn-primary" type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? <><div className="spinner" /> Saving…</> : "💾 Save Employee"}
        </button>
      </div>

    </div>
  );
}