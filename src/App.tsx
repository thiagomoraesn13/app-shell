import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulationEntry } from "./SimulationEntry";
import { Home } from "./Home";
import { OnboardingEntry } from "./OnboardingEntry";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/onboarding/*" element={<OnboardingEntry />} />
        <Route path="/simulation/*" element={<SimulationEntry />} />

        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
