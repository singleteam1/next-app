"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { SessionStatusWidget } from "@/components/dashboard/session-status-widget";
import { UserProfileWidget } from "@/components/dashboard/user-profile-widget";
import { useAuth } from "@/hooks/use-auth";

export function DashboardView() {
  const { user, isLoadingUser } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <DashboardHeader />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Welcome back{user?.name ? `, ${user.name}` : ""}!
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Manage your account and view live authentication telemetry.
          </p>
        </div>

        {isLoadingUser ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-neutral-300 border-t-neutral-900 dark:border-neutral-700 dark:border-t-neutral-100" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <UserProfileWidget user={user} />
            <SessionStatusWidget />
          </div>
        )}
      </main>
    </div>
  );
}
