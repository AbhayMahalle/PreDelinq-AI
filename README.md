# 🏦 PreDelinq AI — Delinquency Prediction System

PreDelinq AI is a banking-grade credit risk modeling project designed to predict customer delinquency using the Home Credit dataset. This repository contains the complete end-to-end data pipeline, including Exploratory Data Analysis (EDA) and Feature Engineering.

---

## 📂 Project Structure

This directory structure represents the complete project layout. 
*(Note: Large raw data files and full processed datasets are excluded from GitHub using `.gitignore` due to size limitations, but a sample dataset and generation scripts are included below to showcase the output structure.)*

```text
PreDelinq-AI/
├── data/                                  # [IGNORED] Raw Home Credit Datasets (~2.5 GB)
│   ├── application_train.csv
│   ├── bureau.csv
│   ├── previous_application.csv
│   ├── installments_payments.csv
│   └── credit_card_balance.csv
│
├── notebooks/                             # Core Analysis & Pipelines
│   ├── 01_eda.ipynb                       # Phase 1: Exploratory Data Analysis (86 cells, 16 sections)
│   └── 02_feature_engineering.ipynb       # Phase 2: Feature Engineering & Preprocessing (16 sections)
│
├── processed/                             # Processed Feature Tables
│   ├── final_feature_table.csv            # [IGNORED] Clean master feature table (329 MB, 307,511 rows)
│   └── final_feature_table_sample.csv     # [TRACKED] Mock sample dataset (10 rows) for schema demonstration
│
├── .gitignore                             # Git ignore rules configuration
└── README.md                              # Project documentation and guide
```

---

## 🛠️ Datasets and Pipelines

### Phase 1: Exploratory Data Analysis (`notebooks/01_eda.ipynb`)
Contains extensive demographic, financial, and behavioral credit analysis of candidates, showcasing credit card utilization trends, bureau risk metrics, and payment delays.

### Phase 2: Feature Engineering (`notebooks/02_feature_engineering.ipynb`)
Aggregates multiple relational datasets into a single customer-level feature table. It handles:
- **Imputation**: Median imputation for skewed continuous data; "Unknown" flags for missing categories.
- **Anomaly Correction**: Flagging and replacing the 365,243 days employed placeholder.
- **Ratio Engineering**: Debt-to-income proxies, loan-to-value proxies, age/employment calculations, and external source score aggregations (mean, max, min, product).
- **Categorical Encoding**: Low-cardinality features are One-Hot Encoded; high-cardinality features are Frequency Encoded.

### Sample Data Table (`processed/final_feature_table_sample.csv`)
Since the final feature table is 329 MB and cannot be pushed to GitHub, we have committed a **10-row sample** showing the exact column structure, feature interactions, and post-processed format ready for model feeding in Phase 3.
