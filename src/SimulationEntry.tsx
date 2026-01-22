import {
  SimulationProvider,
  SimulationRoutes,
} from "@thiagomoraesn13/simulation";
import { useNavigate } from "react-router-dom";

export function SimulationEntry() {
  const navigate = useNavigate();

  return (
    <SimulationProvider
      value={{
        goToOnboarding: () => navigate("/onboarding/page2"),
      }}
    >
      <SimulationRoutes />
    </SimulationProvider>
  );
}
