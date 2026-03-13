import { useState, useEffect, useCallback } from "react";
import { employeeService } from "../services/employeeService";

export function useEmployees(refresh) {
  const [employees, setEmployees] = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await employeeService.getAll();
      setEmployees(res.data);
    } catch {
      setError("Failed to load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load, refresh]);

  return { employees, loading, error };
}