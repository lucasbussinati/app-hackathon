import { HashRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Welcome from "./screens/Welcome";
import BodyAssessment from "./screens/BodyAssessment";
import EmotionAssessment from "./screens/EmotionAssessment";
import Results from "./screens/Results";
import History from "./screens/History";
import About from "./screens/About";
import { AssessmentProvider } from "./store/assessment";

export default function App() {
  return (
    <AssessmentProvider>
      <HashRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<Welcome />} />
            <Route path="body" element={<BodyAssessment />} />
            <Route path="emotions" element={<EmotionAssessment />} />
            <Route path="results" element={<Results />} />
            <Route path="history" element={<History />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </HashRouter>
    </AssessmentProvider>
  );
}
