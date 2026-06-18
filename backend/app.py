from flask import Flask
from flask_cors import CORS

from routes.model_info import model_info_bp
from routes.prediction import prediction_bp
from routes.analytics import analytics_bp

from services.model_service import ModelService
from services.portfolio_service import PortfolioService
from services.shap_service import ShapService

def create_app():
    # Initialize app
    app = Flask(__name__)
    
    # Configure CORS
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    
    # Register blueprints
    app.register_blueprint(model_info_bp, url_prefix='/api')
    app.register_blueprint(prediction_bp, url_prefix='/api')
    app.register_blueprint(analytics_bp, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    print("[INIT] Starting PreDelinq AI Flask Backend...")
    # Initialize singletons at startup
    ModelService()
    ShapService()
    PortfolioService()
    
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True, use_reloader=False)
