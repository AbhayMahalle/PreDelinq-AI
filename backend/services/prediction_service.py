from utils.preprocessing import build_feature_vector
from utils.recommendation_engine import assign_risk_segment, get_recommendation
from services.model_service import ModelService
from services.shap_service import ShapService

class PredictionService:
    def __init__(self):
        self.model_service = ModelService()
        self.shap_service = ShapService()

    def predict(self, inputs: dict) -> dict:
        """Process inputs and return prediction and recommendations."""
        X = build_feature_vector(inputs)
        
        # Predict Probability of Default
        pd_score = float(self.model_service.predict_proba(X)[0, 1])
        
        segment = assign_risk_segment(pd_score)
        recommendation = get_recommendation(pd_score)

        return {
            "pd_score": round(pd_score, 4),
            "risk_segment": segment,
            "recommendation": recommendation,
            "inputs_received": inputs
        }

    def explain(self, inputs: dict) -> dict:
        """Generate prediction, SHAP values, and natural language explanation."""
        X = build_feature_vector(inputs)
        
        pd_score = float(self.model_service.predict_proba(X)[0, 1])
        segment = assign_risk_segment(pd_score)
        recommendation = get_recommendation(pd_score)

        top_features, risk_factors, protective_factors = self.shap_service.explain(X)
        narrative = self.shap_service.generate_narrative(risk_factors, protective_factors, pd_score, segment)

        return {
            "pd_score": round(pd_score, 4),
            "risk_segment": segment,
            "recommendation": recommendation,
            "top_features": top_features,
            "risk_factors": risk_factors,
            "protective_factors": protective_factors,
            "narrative": narrative
        }
