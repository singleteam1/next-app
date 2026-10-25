"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function DashboardHeader() {
  const { user, logout, isLoggingOut } = useAuth();

  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-900 font-bold text-white dark:bg-neutral-100 dark:text-neutral-900">
            P
          </div>
          <div>
            <h1 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Dashboard
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Protected Area
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user?.email ? (
            <span className="hidden text-xs text-neutral-600 sm:inline dark:text-neutral-400">
              Signed in as{" "}
              <strong className="text-neutral-900 dark:text-neutral-100">
                {user.email}
              </strong>
            </span>
          ) : null}

          <Button
            variant="outline"
            size="sm"
            onClick={() => logout()}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </header>
  );
}
