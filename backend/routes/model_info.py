from flask import Blueprint, jsonify
from services.model_service import ModelService
from services.portfolio_service import PortfolioService

model_info_bp = Blueprint('model_info', __name__)

@model_info_bp.route('/health', methods=['GET'])
def health():
    model_service = ModelService()
    model = model_service.get_model()
    return jsonify({
        "status": "healthy",
        "model_loaded": model is not None,
        "features": len(model_service.get_feature_names())
    })

@model_info_bp.route('/model-info', methods=['GET'])
def model_info():
    portfolio_service = PortfolioService()
    model_comparison_df = portfolio_service.get_model_comparison_df()
    model_service = ModelService()

    if model_comparison_df is None:
        return jsonify({"error": "Model comparison data not available"}), 404

    best_row = model_comparison_df.loc[model_comparison_df["ROC_AUC"].idxmax()]
    
    return jsonify({
        "model_name": best_row["Model"],
        "model_type": type(model_service.get_model()).__name__,
        "num_features": len(model_service.get_feature_names()),
        "roc_auc": round(float(best_row["ROC_AUC"]), 4),
        "pr_auc": round(float(best_row["PR_AUC"]), 4),
        "f1": round(float(best_row["F1"]), 4),
        "recall": round(float(best_row["Recall"]), 4),
        "accuracy": round(float(best_row["Accuracy"]), 4),
    })

@model_info_bp.route('/model-comparison', methods=['GET'])
def model_comparison():
    portfolio_service = PortfolioService()
    from services.shap_service import ShapService
    shap_service = ShapService()
    
    model_comp_df = portfolio_service.get_model_comparison_df()
    feat_imp_df = portfolio_service.get_feature_importance_df()

    if model_comp_df is None or feat_imp_df is None:
        return jsonify({"error": "Data not available"}), 404

    records = model_comp_df.to_dict(orient="records")
    fi_top20 = feat_imp_df.nlargest(20, "Importance").to_dict(orient="records")
    
    for item in fi_top20:
        item["label"] = shap_service.get_feature_label(item["Feature"])

    return jsonify({
        "models": records,
        "feature_importance_top20": fi_top20
    })
