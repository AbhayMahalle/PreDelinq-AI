import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import RiskScoring from "./pages/RiskScoring";
import Explainability from "./pages/Explainability";
import PortfolioAnalytics from "./pages/PortfolioAnalytics";
import ModelInsights from "./pages/ModelInsights";
import ProjectStory from "./pages/ProjectStory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="risk-scoring" element={<RiskScoring />} />
          <Route path="explainability" element={<Explainability />} />
          <Route path="portfolio" element={<PortfolioAnalytics />} />
          <Route path="model-insights" element={<ModelInsights />} />
          <Route path="project-story" element={<ProjectStory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
