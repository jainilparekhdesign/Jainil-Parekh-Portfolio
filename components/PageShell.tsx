import type { ReactNode } from "react";
import BgGrid from "./BgGrid";
import Nav from "./Nav";
import ScrollIndicator from "./ScrollIndicator";
import Toolbar from "./Toolbar";

type PageShellProps = {
  active: "home" | "projects";
  children: ReactNode;
<<<<<<< HEAD
  showScrollIndicator?: boolean;
};

export default function PageShell({
  active,
  children,
  showScrollIndicator = true,
}: PageShellProps) {
=======
};

export default function PageShell({ active, children }: PageShellProps) {
>>>>>>> 5f9b7a0b371f50a33f333de98dcae6bc698071a4
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <BgGrid />
      <Nav active={active} />
      {children}
<<<<<<< HEAD
      {showScrollIndicator && <ScrollIndicator />}
=======
      <ScrollIndicator />
>>>>>>> 5f9b7a0b371f50a33f333de98dcae6bc698071a4
      <Toolbar />
    </div>
  );
}
