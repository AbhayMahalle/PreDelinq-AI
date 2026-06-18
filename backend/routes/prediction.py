from flask import Blueprint, jsonify, request
from services.prediction_service import PredictionService

prediction_bp = Blueprint('prediction', __name__)

@prediction_bp.route('/predict', methods=['POST'])
def predict():
    try:
        inputs = request.json
        if not inputs:
            return jsonify({"success": False, "message": "Invalid or missing JSON data"}), 400

        prediction_service = PredictionService()
        result = prediction_service.predict(inputs)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@prediction_bp.route('/explain', methods=['POST'])
def explain():
    try:
        inputs = request.json
        if not inputs:
            return jsonify({"success": False, "message": "Invalid or missing JSON data"}), 400

        prediction_service = PredictionService()
        result = prediction_service.explain(inputs)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
