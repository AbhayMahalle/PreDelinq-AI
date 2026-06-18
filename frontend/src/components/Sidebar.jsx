import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  UserCheck,
  BrainCircuit,
  PieChart,
  BarChart3,
  BookOpen,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Executive Dashboard", icon: LayoutDashboard },
  { href: "/risk-scoring", label: "Customer Scoring", icon: UserCheck },
  { href: "/explainability", label: "Explainable AI", icon: BrainCircuit },
  { href: "/portfolio", label: "Portfolio Analytics", icon: PieChart },
  { href: "/model-insights", label: "Model Insights", icon: BarChart3 },
  { href: "/project-story", label: "Project Story", icon: BookOpen },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900">PreDelinq AI</h1>
          <p className="text-[11px] font-medium text-slate-400">Credit Risk Intelligence</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-[18px] w-[18px] ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  {item.label}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 px-6 py-4">
        <p className="text-[11px] text-slate-400">
          AI-Powered Risk Platform
        </p>
        <p className="text-[10px] text-slate-300 mt-0.5">
          v1.0 — Phase 4
        </p>
      </div>
    </aside>
  );
}
