import { useNavigate } from "react-router-dom";
import { Button, Icon } from "@thiagomoraesn13/ui";
import { cn } from "tailwind-variants";

import { text } from "@thiagomoraesn13/design-tokens";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-2 flex flex-col gap-4">
      <h1 className={cn(text("esp-b"), "font-bold")}>App Shell</h1>
      <h1 className={"text-brand font-bold"}>App Shell</h1>

      <Button
        width="full"
        onClick={() => navigate("/simulation")}
        //loading={true}
      >
        Ir para Simulation
      </Button>
      <Icon name="AlertCircle" size={25} className="text-brand" />
    </div>
  );
}
