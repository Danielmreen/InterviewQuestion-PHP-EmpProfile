const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api/v1";

async function request(method, path, body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  const res  = await fetch(`${BASE}${path}`, opts);
  const json = await res.json();

  if (!res.ok) throw { status: res.status, errors: json.errors ?? {} };
  return json;
}

export const employeeService = {
  getAll: ()     => request("GET",  "/employees"),
  create: (data) => request("POST", "/employees", data),
};
