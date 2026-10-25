import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCardSkeleton } from "@/components/auth/auth-card-skeleton";
import { LoginCard } from "@/components/auth/login-card";

export const metadata: Metadata = {
  title: "Auth",
};
export default function AuthPage() {
  return (
    <Suspense fallback={<AuthCardSkeleton />}>
      <LoginCard />
    </Suspense>
  );
}
