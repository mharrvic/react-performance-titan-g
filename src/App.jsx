import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import ActivityList from "./components/home/ActivityList";
import OverviewDashboard from "./components/home/OverviewDashboard";
import PageHeader from "./components/home/PageHeader";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-full">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-64 flex flex-col flex-1">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
