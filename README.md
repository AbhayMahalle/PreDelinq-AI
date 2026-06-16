# 🏦 PreDelinq AI — Delinquency Prediction System

PreDelinq AI is a banking-grade credit risk modeling project designed to predict customer delinquency using the Home Credit dataset. This repository contains the complete end-to-end data pipeline, including Exploratory Data Analysis (EDA), Feature Engineering, and Machine Learning Model Development.

---

## 📂 Project Structure

This directory structure represents the complete project layout. 
*(Note: Large raw data files and full processed datasets are excluded from GitHub using `.gitignore` due to size limitations, but sample datasets and evaluation metrics are included below to showcase the output structure.)*

```text
PreDelinq-AI/
├── data/                                  # [IGNORED] Raw Home Credit Datasets (~2.5 GB)
│
├── data_samples/                          # [TRACKED] Sample raw datasets (10 rows each)
│
├── models/                                # Phase 3: Model Evaluation & Artifacts
│   ├── best_model.pkl                     # [TRACKED] Serialized best-performing model
│   ├── feature_importance.csv             # [TRACKED] Top predictive features
│   ├── model_comparison.csv               # [TRACKED] Leaderboard of 5 different ML models
│   ├── risk_segments.csv                  # [TRACKED] Business-ready risk buckets
│   └── customer_risk_scores_sample.csv    # [TRACKED] 15-row sample of output PD scores
│
├── notebooks/                             # Core Analysis & Pipelines
│   ├── 01_eda.ipynb                       # Phase 1: Exploratory Data Analysis (16 sections)
│   ├── 02_feature_engineering.ipynb       # Phase 2: Feature Engineering & Preprocessing (16 sections)
│   └── 03_model_development.ipynb         # Phase 3: Model Development, Evaluation & Scoring (17 sections)
│
├── processed/                             # Processed Feature Tables
│   ├── final_feature_table.csv            # [IGNORED] Clean master feature table (329 MB)
│   └── final_feature_table_sample.csv     # [TRACKED] Mock sample dataset (10 rows)
│
├── .gitignore                             # Git ignore rules configuration
└── README.md                              # Project documentation and guide
```

---

## 🛠️ Phases and Pipeline

### Phase 1: Exploratory Data Analysis (`notebooks/01_eda.ipynb`)
Contains extensive demographic, financial, and behavioral credit analysis of candidates, showcasing credit card utilization trends, bureau risk metrics, and payment delays.

### Phase 2: Feature Engineering (`notebooks/02_feature_engineering.ipynb`)
Aggregates multiple relational datasets into a single customer-level feature table. It handles:
- **Imputation**: Median imputation for skewed continuous data; "Unknown" flags for missing categories.
- **Anomaly Correction**: Flagging and replacing outlier artifacts.
- **Ratio Engineering**: Debt-to-income proxies, loan-to-value proxies, and external source score aggregations.
- **Categorical Encoding**: One-Hot Encoding for low cardinality and Frequency Encoding for high cardinality.

### Phase 3: Model Development & Evaluation (`notebooks/03_model_development.ipynb`)
Trains and evaluates 5 industry-standard machine learning models (Logistic Regression, Random Forest, XGBoost, LightGBM, CatBoost) to predict the Probability of Default (PD).
- **Evaluation**: Includes ROC-AUC, PR-AUC, F1-score, threshold optimization, and Confusion Matrices. 
- **Explainability**: Utilizes SHAP (SHapley Additive exPlanations) to provide feature-level transparency required by banking regulations.
- **Business Segmentation**: Maps continuous PD scores into actionable risk buckets (Low, Medium, High, Very High) to simulate real-world credit approval workflows.

---

## 📊 Sample Outputs for Reviewers

Since some files are too large to host on GitHub, we have provided carefully curated samples to demonstrate the data schema and model outputs:

- **`data_samples/`**: 10-row samples of the raw relational tables.
- **`processed/final_feature_table_sample.csv`**: A snapshot of the engineered feature matrix fed into the models.
- **`models/customer_risk_scores_sample.csv`**: A 15-row sample showing the exact output of the final model, including the `PD_SCORE` and assigned `RISK_SEGMENT`.
- **`models/model_comparison.csv`**: A quick look at how the 5 models performed against each other.
