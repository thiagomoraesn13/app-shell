import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OnboardingRoutes } from "@thiagomoraesn13/onboarding";
import { SimulationEntry } from "./SimulationEntry";
import { Home } from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/onboarding/*" element={<OnboardingRoutes />} />
        <Route path="/simulation/*" element={<SimulationEntry />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
