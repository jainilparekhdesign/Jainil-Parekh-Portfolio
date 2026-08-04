import type { ReactNode } from "react";
import BgGrid from "./BgGrid";
import Nav from "./Nav";
import ScrollIndicator from "./ScrollIndicator";
import Toolbar from "./Toolbar";

type PageShellProps = {
  active: "home" | "projects";
  children: ReactNode;
};

export default function PageShell({ active, children }: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <BgGrid />
      <Nav active={active} />
      {children}
      <ScrollIndicator />
      <Toolbar />
    </div>
  );
}
