export function validateEmployee(data) {
  const errors = {};

  if (!data.fullName?.trim())
    errors.fullName = "Full name is required.";
  else if (data.fullName.trim().length < 2)
    errors.fullName = "Name must be at least 2 characters.";

  if (!data.gender)
    errors.gender = "Please select a gender.";

  if (!data.maritalStatus)
    errors.maritalStatus = "Please select a marital status.";

  if (!data.phone?.trim())
    errors.phone = "Phone number is required.";
  else if (!/^\+?[\d\s\-()]{7,15}$/.test(data.phone))
    errors.phone = "Invalid phone number format.";

  if (!data.email?.trim())
    errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email address.";

  if (!data.address?.trim())
    errors.address = "Address is required.";

  if (!data.dateOfBirth) {
    errors.dateOfBirth = "Date of birth is required.";
  } else {
    const age = Math.floor((Date.now() - new Date(data.dateOfBirth)) / 31557600000);
    if (age < 16 || age > 100)
      errors.dateOfBirth = "Employee must be between 16 and 100 years old.";
  }

  if (!data.nationality)
    errors.nationality = "Nationality is required.";

  if (!data.hireDate)
    errors.hireDate = "Hire date is required.";

  if (!data.department)
    errors.department = "Please select a department.";

  if (!data.jobTitle?.trim())
    errors.jobTitle = "Job title is required.";

  if (!data.employmentType)
    errors.employmentType = "Please select employment type.";

  return errors;
}

export const isValid = (errors) => Object.keys(errors).length === 0;
