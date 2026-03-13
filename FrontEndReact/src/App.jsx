import { useState, useCallback } from "react";
import { Navbar }            from "./components/layout/NavBar";
import { Toast }             from "./components/common/Toast";
import { AddEmployeePage }   from "./pages/AddEmployeePage";
import { EmployeeListPage }  from "./pages/EmployeeListPage";
import { useToast }          from "./hooks/useToast";

export default function App() {
  const [tab,         setTab]         = useState("form");
  const [listRefresh, setListRefresh] = useState(0);
  const { toasts, showToast }         = useToast();

  const handleSuccess = useCallback(() => {
    setListRefresh((r) => r + 1);
    setTimeout(() => setTab("list"), 800);
  }, []);

  return (
    <div className="app">
      <Navbar activeTab={tab} onTabChange={setTab} />

      {tab === "form"
        ? <AddEmployeePage onSuccess={handleSuccess} showToast={showToast} />
        : <EmployeeListPage refresh={listRefresh} />
      }

      <Toast toasts={toasts} />
    </div>
  );
}