import joblib
import os
from config import MODEL_PATH

class ModelService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelService, cls).__new__(cls)
            cls._instance._load_model()
        return cls._instance

    def _load_model(self):
        if not os.path.exists(MODEL_PATH):
            print(f"[ERROR] Model file not found at {MODEL_PATH}")
            self.model = None
            self.feature_names = []
            return

        print("[...] Loading CatBoost model using joblib...")
        self.model = joblib.load(MODEL_PATH)
        self.feature_names = list(self.model.feature_names_)
        print(f"[OK] Model loaded: {type(self.model).__name__} with {len(self.feature_names)} features")

    def get_model(self):
        return self.model

    def get_feature_names(self):
        return self.feature_names

    def predict_proba(self, X):
        if self.model is None:
            raise ValueError("Model not loaded")
        return self.model.predict_proba(X)
