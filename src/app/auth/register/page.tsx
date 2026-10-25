import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCardSkeleton } from "@/components/auth/auth-card-skeleton";
import { RegisterCard } from "@/components/auth/register-card";

export const metadata: Metadata = {
  title: "Login",
};
export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthCardSkeleton />}>
      <RegisterCard />
    </Suspense>
  );
}
