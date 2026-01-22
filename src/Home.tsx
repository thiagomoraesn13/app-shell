import { useNavigate } from "react-router-dom";
import { GenericButton } from "@thiagomoraesn13/ui";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">App Shell</h1>

      <GenericButton
        variant="primary"
        width="full"
        onClick={() => navigate("/onboarding")}
      >
        Ir para Onboarding
      </GenericButton>

      <GenericButton
        variant="secondary"
        width="full"
        onClick={() => navigate("/simulation")}
      >
        Ir para Simulation
      </GenericButton>
    </div>
  );
}
