export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-SG", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export const getInitials = (name) =>
  name ? name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?";