import { useState } from "react";
import { predictCustomer } from "../services/api";
import RiskGauge from "../components/RiskGauge";

const INITIAL_FORM_STATE = {
  age: 35,
  income: 150000,
  credit_amount: 300000,
  annuity: 15000,
  goods_price: 300000,
  employment_years: 5,
  family_members: 2,
  children: 0,
  ext_source_1: 0.5,
  ext_source_2: 0.5,
  ext_source_3: 0.5,
  own_car: false,
};

export default function RiskScoring() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : parseFloat(value) || 0,
    }));
  };

  const handleScore = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await predictCustomer(formData);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to score customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-3rem)] flex-col lg:flex-row gap-6">
      {/* Left: Input Form */}
      <div className="w-full lg:w-1/2 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-bold text-slate-800">Customer Profile Input</h2>
          <p className="text-sm text-slate-500">
            Enter application details to estimate Probability of Default
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-5">
            {Object.keys(INITIAL_FORM_STATE).map((key) => {
              const label = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

              if (key === "own_car") {
                return (
                  <div key={key} className="col-span-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor={key} className="text-sm font-medium text-slate-700">
                      Customer owns a car
                    </label>
                  </div>
                );
              }

              return (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600">
                    {label}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    step={key.includes("ext") ? "0.01" : "1"}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-4">
          <button
            onClick={handleScore}
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? "Scoring..." : "Calculate Risk Score"}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>

      {/* Right: Results */}
      <div className="w-full lg:w-1/2 flex flex-col rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 bg-slate-50">
          <h2 className="text-lg font-bold text-slate-800">Scoring Engine Results</h2>
        </div>
        <div className="flex-1 p-8 flex flex-col items-center justify-center bg-slate-50">
          {result ? (
            <div className="animate-fade-in w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 text-center shadow-lg">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-6">
                Probability of Default
              </h3>
              
              <RiskGauge score={result.pd_score} />
              
              <div className="mt-8 border-t border-slate-100 pt-6">
                <p className="text-xs font-semibold uppercase text-slate-400">System Recommendation</p>
                <div className={`mt-3 inline-block rounded-lg px-4 py-2 font-bold text-lg
                  ${result.recommendation.includes("Reject") ? "bg-red-100 text-red-700" :
                    result.recommendation.includes("Approve") ? "bg-emerald-100 text-emerald-700" :
                    "bg-amber-100 text-amber-700"
                  }
                `}>
                  {result.recommendation}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 mb-4">
                <span className="text-slate-400 text-2xl font-bold">?</span>
              </div>
              <p className="text-slate-500 font-medium">Awaiting customer data</p>
              <p className="text-slate-400 text-sm mt-1">Submit the form to generate a score</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
