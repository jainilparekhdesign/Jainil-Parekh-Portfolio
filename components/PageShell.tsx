import type { ReactNode } from "react";
import BgGrid from "./BgGrid";
import Nav from "./Nav";
import ScrollIndicator from "./ScrollIndicator";
import Toolbar from "./Toolbar";

type PageShellProps = {
  active: "home" | "projects" | "resume";
  children: ReactNode;
  showScrollIndicator?: boolean;
  showBgGrid?: boolean;
};

export default function PageShell({
  active,
  children,
  showScrollIndicator = false,
  showBgGrid = true,
}: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {showBgGrid && <BgGrid />}
      <Nav active={active} />
      {children}
      {showScrollIndicator && <ScrollIndicator />}
      <Toolbar />
    </div>
  );
}
