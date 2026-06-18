import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { fetchModelComparison } from "../services/api";

export default function ModelInsights() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModelComparison()
      .then(setData)
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

  if (!data) return <div>Failed to load model insights.</div>;

  const chartData = data.feature_importance_top20.map(item => ({
    name: item.label,
    value: item.Importance,
  })).reverse(); // Reverse for ascending YAxis order

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Model Insights</h1>
        <p className="mt-1 text-sm text-slate-500">
          Global feature importance across the entire portfolio.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Top 20 Global Predictors</h2>
        </div>
        <div className="p-6">
          <ResponsiveContainer width="100%" height={600}>
            <BarChart layout="vertical" data={chartData} margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={200} />
              <Tooltip
                formatter={(value) => [Number(value).toFixed(2), "Importance"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
