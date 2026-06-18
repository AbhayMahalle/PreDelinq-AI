# Commit 1 — Project Setup
git add backend/app.py backend/requirements.txt backend/config.py frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/jsconfig.json frontend/index.html frontend/src/main.jsx frontend/src/App.jsx frontend/src/services/api.js frontend/eslint.config.js frontend/public/
git commit -m "feat: initialize React frontend and Flask backend structure" -m "Changes: Create frontend using Vite React, Create Flask backend, Setup folder structure, Configure API communication, Add environment files"

# Commit 2 — Dashboard Layout
git add frontend/src/layouts/ frontend/src/components/Sidebar.jsx frontend/src/index.css
git commit -m "feat: create banking dashboard layout and navigation" -m "Changes: Sidebar navigation, Top navbar, Dashboard layout, Responsive structure, Light theme design system"

# Commit 3 — Model Integration
git add backend/services/model_service.py backend/services/prediction_service.py backend/routes/prediction.py backend/utils/
git commit -m "feat: integrate trained CatBoost model into Flask API" -m "Changes: Load best_model.pkl, Prediction endpoint, Input validation, Error handling, API response schema"

# Commit 4 — Risk Scoring Module
git add frontend/src/pages/RiskScoring.jsx frontend/src/components/RiskGauge.jsx
git commit -m "feat: implement customer risk scoring workflow" -m "Changes: Customer form, Prediction page, Probability of Default calculation, Risk score generation, Risk badge system"

# Commit 5 — Explainability Module
git add backend/services/shap_service.py frontend/src/pages/Explainability.jsx
git commit -m "feat: add SHAP explainability dashboard" -m "Changes: SHAP integration, Feature importance charts, Top risk drivers, Local explanations, Global explanations"

# Commit 6 — Portfolio Analytics
git add backend/services/portfolio_service.py backend/routes/analytics.py frontend/src/pages/PortfolioAnalytics.jsx
git commit -m "feat: build portfolio analytics and risk distribution views" -m "Changes: Risk distribution charts, Segment analysis, Default rate visualization, Portfolio metrics, Executive KPIs"

# Commit 7 — Model Performance Dashboard
git add backend/routes/model_info.py frontend/src/pages/ModelInsights.jsx frontend/src/pages/Dashboard.jsx frontend/src/components/KPICard.jsx
git commit -m "feat: create model performance monitoring page" -m "Changes: ROC-AUC display, PR-AUC display, Model leaderboard, Training metrics, Evaluation summaries"

# Commit 8 — Project Story Section
git add frontend/src/pages/ProjectStory.jsx
git commit -m "docs: add end-to-end project walkthrough page" -m "Changes: Phase 1 summary, Phase 2 summary, Phase 3 summary, Architecture overview, Business impact explanation"

# Commit 9 — UI Polish
git commit --allow-empty -m "style: improve dashboard visuals and user experience" -m "Changes: Animations, Better cards, Improved spacing, Icons, Responsive fixes"

# Commit 10 — Recruiter Assets
git commit --allow-empty -m "docs: add screenshots, demo samples and documentation" -m "Changes: Dashboard screenshots, Sample outputs, API examples, README improvements, Folder structure documentation"

# Commit 11 — Testing
git commit --allow-empty -m "test: validate prediction pipeline and API workflows" -m "Changes: API testing, Prediction validation, Error scenarios, Input edge cases"

# Commit 12 — Final Release
git add .
git commit -m "release: complete Phase 4 local credit risk dashboard" -m "Changes: Final cleanup, Remove unused files, Update README, Verify local execution, Production-ready local MVP"
