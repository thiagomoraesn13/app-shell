import {
  OnboardingProvider,
  OnboardingRoutes,
} from "@thiagomoraesn13/onboarding";
import { useNavigate } from "react-router-dom";

export function OnboardingEntry() {
  const navigate = useNavigate();

  return (
    <OnboardingProvider
      value={{
        goToHome: () => navigate("/"),
        theme: "noverde",
        assetsBaseUrl: "/assets",
      }}
    >
      <OnboardingRoutes />
    </OnboardingProvider>
  );
}
