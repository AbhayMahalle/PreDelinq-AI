import pandas as pd
import os
from config import (
    MODEL_COMPARISON_PATH,
    FEATURE_IMPORTANCE_PATH,
    RISK_SEGMENTS_PATH,
    PORTFOLIO_SCORES_PATH,
    FEATURE_TABLE_PATH
)
from services.model_service import ModelService

class PortfolioService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(PortfolioService, cls).__new__(cls)
            cls._instance._load_data()
        return cls._instance

    def _load_data(self):
        print("[...] Loading static CSV datasets...")
        
        try:
            self.model_comparison_df = pd.read_csv(MODEL_COMPARISON_PATH)
            self.feature_importance_df = pd.read_csv(FEATURE_IMPORTANCE_PATH)
            self.risk_segments_df = pd.read_csv(RISK_SEGMENTS_PATH)
        except Exception as e:
            print(f"[WARN] Failed to load some model metric CSVs: {e}")
            self.model_comparison_df = None
            self.feature_importance_df = None
            self.risk_segments_df = None

        if os.path.exists(PORTFOLIO_SCORES_PATH):
            self.portfolio_df = pd.read_csv(PORTFOLIO_SCORES_PATH)
            print(f"[OK] Portfolio loaded: {len(self.portfolio_df):,} customers")
        else:
            self.portfolio_df = None
            print("[WARN] customer_risk_scores.csv not found; portfolio analytics disabled")

        model_service = ModelService()
        feature_names = model_service.get_feature_names()

        if os.path.exists(FEATURE_TABLE_PATH) and feature_names:
            print("[...] Loading feature table for median computation...")
            # Load a sample to compute medians quickly
            ft = pd.read_csv(FEATURE_TABLE_PATH, usecols=feature_names, nrows=50000)
            self.feature_medians = ft.median().to_dict()
            del ft
            print("[OK] Feature medians computed")
        else:
            self.feature_medians = {f: 0.0 for f in feature_names} if feature_names else {}
            print("[WARN] Feature table not found; using zero defaults")

    def get_feature_medians(self):
        return self.feature_medians

    def get_portfolio_df(self):
        return self.portfolio_df

    def get_model_comparison_df(self):
        return self.model_comparison_df

    def get_feature_importance_df(self):
        return self.feature_importance_df

    def get_risk_segments_df(self):
        return self.risk_segments_df
