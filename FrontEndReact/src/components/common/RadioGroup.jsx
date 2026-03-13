export function RadioGroup({ options, value, onChange, hasError }) {
  return (
    <div className="radio-group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={[
            "radio-btn",
            value === opt   ? "selected"     : "",
            !value && hasError ? "error-border" : "",
          ].join(" ").trim()}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}