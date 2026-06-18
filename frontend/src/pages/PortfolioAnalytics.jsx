import { useState, useEffect } from "react";
import { searchPortfolio } from "../services/api";

export default function PortfolioAnalytics() {
  const [data, setData] = useState({ data: [], total: 0, page: 1, total_pages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("");

  const loadData = async (p, s, seg) => {
    setLoading(true);
    try {
      const result = await searchPortfolio(p, 15, s, seg);
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadData(page, search, segment);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [page, search, segment]);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Portfolio Analytics</h1>
          <p className="mt-1 text-sm text-slate-500">
            Search and filter through {data.total.toLocaleString()} portfolio customers
          </p>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search SK_ID_CURR..."
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <select
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
            value={segment}
            onChange={(e) => {
              setSegment(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All Segments</option>
            <option value="Very Low Risk">Very Low Risk</option>
            <option value="Low Risk">Low Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="High Risk">High Risk</option>
            <option value="Very High Risk">Very High Risk</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Customer ID</th>
                <th className="px-6 py-4">Actual Target</th>
                <th className="px-6 py-4">PD Score</th>
                <th className="px-6 py-4">Risk Segment</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    Loading portfolio data...
                  </td>
                </tr>
              ) : data.data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                    No customers found matching the criteria.
                  </td>
                </tr>
              ) : (
                data.data.map((row) => (
                  <tr key={row.SK_ID_CURR} className="table-row-hover transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{row.SK_ID_CURR}</td>
                    <td className="px-6 py-4">
                      {row.TARGET === 1 ? (
                        <span className="badge bg-red-100 text-red-700">Defaulted</span>
                      ) : (
                        <span className="badge bg-emerald-100 text-emerald-700">Repaid</span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-mono">{(row.PD_SCORE * 100).toFixed(2)}%</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        row.RISK_SEGMENT.includes('Very High') ? 'bg-red-100 text-red-700' :
                        row.RISK_SEGMENT.includes('High') ? 'bg-orange-100 text-orange-700' :
                        row.RISK_SEGMENT.includes('Medium') ? 'bg-amber-100 text-amber-700' :
                        row.RISK_SEGMENT.includes('Very Low') ? 'bg-emerald-100 text-emerald-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {row.RISK_SEGMENT}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-semibold ${
                        row.recommendation.includes('Reject') ? 'text-red-600' :
                        row.recommendation.includes('Review') ? 'text-amber-600' :
                        'text-emerald-600'
                      }`}>
                        {row.recommendation}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-3 bg-slate-50">
          <p className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-900">{(data.page - 1) * data.page_size + 1}</span> to{" "}
            <span className="font-medium text-slate-900">{Math.min(data.page * data.page_size, data.total)}</span> of{" "}
            <span className="font-medium text-slate-900">{data.total}</span> results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={data.page === 1}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.total_pages, p + 1))}
              disabled={data.page === data.total_pages}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
