export function Toast({ toasts }) {
  return (
    <div className="toast-wrap">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.type === "success" ? "✅" : "❌"} {t.msg}
        </div>
      ))}
    </div>
  );
}