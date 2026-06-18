export default function ProjectStory() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8 border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">PreDelinq AI</h1>
        <p className="mt-2 text-lg text-slate-600">
          Building a Banking-Grade Credit Risk Intelligence Platform
        </p>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Phase 1: Exploratory Data Analysis</h2>
        <p className="text-slate-600 mb-6">
          The project began by understanding the core business problem: predicting whether an applicant will default on a loan. We analyzed a highly imbalanced dataset, identifying key default patterns related to external credit scores, employment length, and credit-to-income ratios.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Phase 2: Feature Engineering</h2>
        <p className="text-slate-600 mb-6">
          We created 193 highly predictive features. This involved complex aggregations of bureau data, previous applications, installment payments, and credit card balances. Domain-specific financial ratios (like Annuity-to-Income) were engineered to capture repayment capacity accurately.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Phase 3: Model Development</h2>
        <p className="text-slate-600 mb-6">
          We evaluated multiple algorithms, but CatBoost ultimately provided the best performance (ROC-AUC 0.7812). It successfully handled the massive feature space and categorical variables natively. We threshold-tuned the model to align with strict business logic.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Phase 4: Full-Stack Platform</h2>
        <p className="text-slate-600 mb-6">
          We migrated the predictive model into a robust Flask backend and built this React/Vite dashboard. The system integrates SHAP (SHapley Additive exPlanations) to ensure regulatory compliance and explainability for every credit decision made by the AI.
        </p>

        <div className="mt-8 rounded-xl bg-blue-50 p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Business Impact</h3>
          <ul className="list-disc pl-5 text-blue-800 space-y-1">
            <li>Automated, instant credit risk assessment</li>
            <li>Transparent, explainable decisions via SHAP</li>
            <li>Granular portfolio risk monitoring</li>
            <li>Consistent, data-driven underwriting policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
