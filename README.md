# 🏦 PreDelinq AI — Credit Risk Intelligence Platform

PreDelinq AI is an end-to-end, banking-grade credit risk modeling system and dashboard designed to predict customer delinquency. Built using the Home Credit dataset, this repository showcases a complete machine learning lifecycle—from Exploratory Data Analysis (EDA) and Feature Engineering to Model Development and the deployment of a **Full-Stack Credit Risk Intelligence Dashboard**.

This project demonstrates not only the ability to build highly predictive ML models but also the capability to deploy them into a professional, recruiter-friendly, Explainable AI (XAI) product.

---

## 🚀 Key Features

* **Advanced Predictive Modeling**: Utilizes CatBoost trained on 193 engineered features, achieving strong predictive performance (ROC-AUC: 0.7812).
* **Explainable AI (SHAP)**: Fully integrates SHapley Additive exPlanations to provide regulatory-compliant, feature-level transparency for every credit decision.
* **Banking-Grade Dashboard**: A premium, responsive React (Vite) frontend showcasing Probability of Default (PD) scoring, portfolio analytics, and model insights.
* **Microservices Architecture**: A modular Flask REST API serving inferences and analytics in real-time.

---

## 🛠️ Technology Stack

**Machine Learning & Data Processing**
* Python, Pandas, NumPy
* Scikit-Learn, CatBoost
* SHAP (Explainable AI)

**Backend API**
* Flask, Flask-CORS
* Joblib (Model Serialization)

**Frontend Dashboard**
* React.js (Vite)
* Tailwind CSS v4, Lucide React
* React Router DOM, Recharts, Axios

---

## 📂 Project Structure

```text
PreDelinq-AI/
├── backend/                               # Flask API Server
│   ├── app.py                             # Application entry point
│   ├── routes/                            # API endpoints (predictions, analytics, model_info)
│   ├── services/                          # Business logic & Singleton ML loaders
│   └── utils/                             # Feature mapping & recommendation logic
│
├── frontend/                              # Vite React Dashboard
│   ├── src/pages/                         # Dashboard modules (Scoring, Portfolio, Explainability)
│   ├── src/components/                    # Reusable UI (KPICards, RiskGauge)
│   └── src/services/api.js                # Axios API client
│
├── models/                                # Serialized ML Artifacts
│   ├── best_model.pkl                     # Production CatBoost model
│   ├── feature_importance.csv             # Global feature importance
│   └── risk_segments.csv                  # Business-ready risk buckets
│
└── notebooks/                             # Data Science Pipeline
    ├── 01_eda.ipynb                       # Exploratory Data Analysis
    ├── 02_feature_engineering.ipynb       # Feature Engineering & Preprocessing
    └── 03_model_development.ipynb         # Model Training & Evaluation
```
*(Note: Large raw data files and the 329MB feature table are ignored via `.gitignore` to adhere to GitHub limitations).*

---

## 📈 The Pipeline (Phases 1-4)

### Phase 1: Exploratory Data Analysis (`notebooks/01_eda.ipynb`)
Extensive demographic, financial, and behavioral credit analysis. Identified critical default patterns related to external credit scores, employment length, and credit card utilization.

### Phase 2: Feature Engineering (`notebooks/02_feature_engineering.ipynb`)
Aggregated multiple relational tables into a single robust customer-level dataset containing 193 features. Engineered domain-specific financial proxies (e.g., Annuity-to-Income, Debt-to-Income) and handled high-cardinality categorical encoding.

### Phase 3: Model Development (`notebooks/03_model_development.ipynb`)
Evaluated 5 industry-standard ML models. Selected **CatBoost** for its superior handling of categorical variables and overall performance. Mapped continuous Probability of Default (PD) scores into actionable risk buckets (Low, Medium, High) to simulate real-world underwriting workflows.

### Phase 4: Full-Stack Dashboard (`backend/` & `frontend/`)
Transformed the Jupyter notebooks into a production-ready Local MVP. The platform allows loan officers and risk analysts to manually input customer profiles, receive instant PD scores, view SHAP-generated risk narratives, and monitor the overall portfolio health.

---

## 💻 How to Run Locally

The application is designed to run entirely on `localhost` without any Docker or cloud dependencies.

### 1. Start the Flask Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
*The backend will initialize the CatBoost model and run on `http://localhost:5000`.*

### 2. Start the React Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The dashboard will compile and be accessible at `http://localhost:3000`.*
