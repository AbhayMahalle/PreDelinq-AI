import shap
from services.model_service import ModelService
from config import FEATURE_LABELS

class ShapService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ShapService, cls).__new__(cls)
            cls._instance._init_explainer()
        return cls._instance

    def _init_explainer(self):
        model_service = ModelService()
        model = model_service.get_model()
        if model is not None:
            print("[...] Initializing SHAP TreeExplainer...")
            self.explainer = shap.TreeExplainer(model)
            print("[OK] SHAP TreeExplainer initialized")
        else:
            self.explainer = None

    def get_feature_label(self, name: str) -> str:
        return FEATURE_LABELS.get(name, name.replace("_", " ").title())

    def explain(self, X):
        if self.explainer is None:
            raise ValueError("SHAP explainer not initialized")
            
        shap_values = self.explainer.shap_values(X)
        if isinstance(shap_values, list):
            sv = shap_values[1][0]
        else:
            sv = shap_values[0]

        model_service = ModelService()
        feature_names = model_service.get_feature_names()

        # Pair feature names with SHAP values
        shap_pairs = list(zip(feature_names, sv.tolist()))
        shap_pairs.sort(key=lambda x: abs(x[1]), reverse=True)

        # Top contributions
        top_features = [
            {
                "feature": name,
                "label": self.get_feature_label(name),
                "shap_value": round(val, 4),
                "direction": "risk" if val > 0 else "protective",
            }
            for name, val in shap_pairs[:25]
        ]

        risk_factors = [f for f in top_features if f["direction"] == "risk"][:10]
        protective_factors = [f for f in top_features if f["direction"] == "protective"][:10]

        return top_features, risk_factors, protective_factors

    def generate_narrative(self, risk_factors, protective_factors, pd_score, segment):
        """Generate a natural-language risk explanation."""
        parts = []
        if pd_score >= 0.35:
            parts.append(f"The customer exhibits an elevated credit risk (PD: {pd_score:.1%}) classified as **{segment}**.")
        elif pd_score >= 0.15:
            parts.append(f"The customer shows a moderate risk profile (PD: {pd_score:.1%}) classified as **{segment}**.")
        else:
            parts.append(f"The customer demonstrates a favorable risk profile (PD: {pd_score:.1%}) classified as **{segment}**.")

        if risk_factors:
            factors_text = ", ".join([f["label"].lower() for f in risk_factors[:3]])
            parts.append(f"Key risk drivers include {factors_text}.")

        if protective_factors:
            factors_text = ", ".join([f["label"].lower() for f in protective_factors[:3]])
            parts.append(f"Conversely, protective factors mitigating risk include {factors_text}.")

        return " ".join(parts)
