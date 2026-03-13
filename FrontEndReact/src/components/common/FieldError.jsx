export function FieldError({ msg }) {
  if (!msg) return null;
  return <div className="field-error">⚠ {msg}</div>;
}