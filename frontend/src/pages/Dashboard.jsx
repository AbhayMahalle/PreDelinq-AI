import { useEffect, useState } from "react";
import {
  Users,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  Award,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import KPICard from "../components/KPICard";
import { fetchPortfolioSummary, fetchModelComparison, fetchModelInfo } from "../services/api";

const SEGMENT_COLORS = {
  "Very Low Risk": "#059669",
  "Low Risk": "#2563eb",
  "Medium Risk": "#d97706",
  "High Risk": "#ea580c",
  "Very High Risk": "#dc2626",
};

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const [models, setModels] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPortfolioSummary(), fetchModelComparison(), fetchModelInfo()])
      .then(([p, m, mi]) => {
        setPortfolio(p);
        setModels(m);
        setModelInfo(mi);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  // Segment data for chart
  const segmentData = portfolio
    ? Object.entries(portfolio.segment_counts).map(([name, count]) => ({
        name: name.replace(" Risk", ""),
        count: count,
        fill: SEGMENT_COLORS[name] || "#94a3b8",
      }))
    : [];

  // PD histogram
  const histData = portfolio?.pd_histogram?.map((b) => ({
    range: `${(b.bin_start * 100).toFixed(0)}%`,
    count: b.count,
  })) || [];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Real-time portfolio overview and risk metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <KPICard
          title="Total Customers"
          value={portfolio ? portfolio.total_customers.toLocaleString() : "—"}
          icon={Users}
          color="blue"
          subtitle="Active portfolio"
        />
        <KPICard
          title="Average PD"
          value={portfolio ? `${(portfolio.avg_pd * 100).toFixed(2)}%` : "—"}
          icon={TrendingUp}
          color="amber"
          subtitle="Portfolio-wide"
        />
        <KPICard
          title="Expected Defaults"
          value={portfolio ? portfolio.expected_defaults.toLocaleString() : "—"}
          icon={AlertTriangle}
          color="red"
          subtitle="PD ≥ 50%"
        />
        <KPICard
          title="High Risk"
          value={portfolio ? portfolio.high_risk_count.toLocaleString() : "—"}
          icon={ShieldAlert}
          color="red"
          subtitle="PD ≥ 35%"
        />
        <KPICard
          title="ROC-AUC"
          value={modelInfo ? modelInfo.roc_auc.toFixed(4) : "—"}
          icon={Award}
          color="green"
          subtitle="Best model"
        />
        <KPICard
          title="Best Model"
          value={modelInfo ? modelInfo.model_name : "—"}
          icon={BarChart3}
          color="purple"
          subtitle={modelInfo ? modelInfo.model_type : ""}
        />
      </div>

      {/* Charts Row */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Risk Segment Distribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-800">Risk Segment Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={segmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [Number(value).toLocaleString(), "Customers"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {segmentData.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PD Distribution Histogram */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-800">PD Score Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="range" tick={{ fontSize: 10 }} interval={4} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value) => [Number(value).toLocaleString(), "Customers"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Model Leaderboard */}
      {models && (
        <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-800">Model Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="pb-3 text-left font-semibold text-slate-500">Model</th>
                  <th className="pb-3 text-center font-semibold text-slate-500">ROC-AUC</th>
                  <th className="pb-3 text-center font-semibold text-slate-500">PR-AUC</th>
                  <th className="pb-3 text-center font-semibold text-slate-500">F1</th>
                  <th className="pb-3 text-center font-semibold text-slate-500">Recall</th>
                  <th className="pb-3 text-center font-semibold text-slate-500">Time (s)</th>
                </tr>
              </thead>
              <tbody>
                {models.models.map((m) => {
                  const isBest = m.Model === modelInfo?.model_name;
                  return (
                    <tr
                      key={m.Model}
                      className={`border-b border-slate-100 table-row-hover ${
                        isBest ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <td className="py-3 font-medium text-slate-800">
                        {m.Model}
                        {isBest && (
                          <span className="ml-2 badge bg-blue-100 text-blue-700">Best</span>
                        )}
                      </td>
                      <td className="py-3 text-center font-mono text-slate-700">{m.ROC_AUC.toFixed(4)}</td>
                      <td className="py-3 text-center font-mono text-slate-700">{m.PR_AUC.toFixed(4)}</td>
                      <td className="py-3 text-center font-mono text-slate-700">{m.F1.toFixed(4)}</td>
                      <td className="py-3 text-center font-mono text-slate-700">{m.Recall.toFixed(4)}</td>
                      <td className="py-3 text-center font-mono text-slate-700">{m.Train_Time_s.toFixed(1)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
