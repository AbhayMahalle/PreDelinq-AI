import { useState } from "react";
import { explainCustomer } from "../services/api";

const INITIAL_FORM_STATE = {
  age: 28,
  income: 60000,
  credit_amount: 800000,
  annuity: 40000,
  goods_price: 800000,
  employment_years: 1,
  family_members: 3,
  children: 1,
  ext_source_1: 0.2,
  ext_source_2: 0.3,
  ext_source_3: 0.2,
  own_car: false,
};

export default function Explainability() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseFloat(value) || 0,
    }));
  };

  const handleExplain = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await explainCustomer(formData);
      setExplanation(data);
    } catch (err) {
      setError(err.message || "Failed to generate explanation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Explainable AI (SHAP)</h1>
        <p className="mt-1 text-sm text-slate-500">
          Understand why the model made a specific prediction for a customer.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Input Form */}
        <div className="col-span-1 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-slate-800">Test Profile</h2>
          <div className="space-y-4">
            {Object.keys(INITIAL_FORM_STATE).slice(0, 6).map((key) => {
              const label = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
              return (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">{label}</label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>
              );
            })}
            <button
              onClick={handleExplain}
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Generate Explanation"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>

        {/* Results */}
        <div className="col-span-1 lg:col-span-2">
          {explanation ? (
            <div className="animate-fade-in space-y-6">
              {/* Top Banner */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-indigo-900 uppercase tracking-wide">
                      Probability of Default
                    </p>
                    <p className="mt-1 text-4xl font-bold text-indigo-700">
                      {(explanation.pd_score * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="badge bg-white text-indigo-800 border border-indigo-200 px-4 py-1.5 text-sm shadow-sm">
                      {explanation.risk_segment}
                    </span>
                  </div>
                </div>
                <div className="mt-6 border-t border-indigo-200/50 pt-4">
                  <p className="text-sm font-medium text-indigo-900">
                    "{explanation.narrative}"
                  </p>
                </div>
              </div>

              {/* Factors */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Risk Factors */}
                <div className="rounded-xl border border-red-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center text-sm font-bold text-red-700">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">↑</span>
                    Risk Drivers (Increases PD)
                  </h3>
                  <div className="space-y-3">
                    {explanation.risk_factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 truncate pr-4" title={factor.feature}>
                          {factor.label}
                        </span>
                        <span className="text-sm font-mono text-red-600">
                          +{factor.shap_value.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Protective Factors */}
                <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center text-sm font-bold text-emerald-700">
                    <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">↓</span>
                    Protective Factors (Decreases PD)
                  </h3>
                  <div className="space-y-3">
                    {explanation.protective_factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 truncate pr-4" title={factor.feature}>
                          {factor.label}
                        </span>
                        <span className="text-sm font-mono text-emerald-600">
                          {factor.shap_value.toFixed(3)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-600">Generate an explanation to see SHAP analysis</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
