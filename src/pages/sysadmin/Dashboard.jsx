import { useState } from "react";
import Button from "../../components/sysadmin/layouts/Button";
import Sidebar from "../../components/sysadmin/layouts/Sidebar";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(false);
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-6">
      <Sidebar sidebar={sidebar} />
      <Button sidebar={sidebar} handleSidebar={handleSidebar}></Button>
      <div className=" col-span-5"></div>
    </main>
  );
};

export default Dashboard;
