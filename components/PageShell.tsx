import type { ReactNode } from "react";
import BgGrid from "./BgGrid";
import Nav from "./Nav";
import ScrollIndicator from "./ScrollIndicator";
import Toolbar from "./Toolbar";

type PageShellProps = {
  active: "home" | "projects";
  children: ReactNode;
  showScrollIndicator?: boolean;
};

export default function PageShell({
  active,
  children,
  showScrollIndicator = true,
}: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <BgGrid />
      <Nav active={active} />
      {children}
      {showScrollIndicator && <ScrollIndicator />}
      <Toolbar />
    </div>
  );
}
