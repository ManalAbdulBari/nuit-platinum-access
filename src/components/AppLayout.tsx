import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

export function AppLayout({ children, hideNav = false }: { children: ReactNode; hideNav?: boolean }) {
  return (
    <div className="mx-auto max-w-md min-h-screen pb-28 relative">
      {children}
      {!hideNav && <BottomNav />}
    </div>
  );
}
