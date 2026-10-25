import type { ReactNode } from "react";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="min-h-screen">{children}</div>;
}
