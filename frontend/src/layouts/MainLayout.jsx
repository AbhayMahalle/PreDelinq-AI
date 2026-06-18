import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="bg-slate-50 text-slate-800 antialiased min-h-screen">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="animate-fade-in px-8 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
