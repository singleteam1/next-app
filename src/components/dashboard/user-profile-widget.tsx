"use client";

import type { UserResponse } from "@/generated/api/model";

export interface UserProfileWidgetProps {
  user: UserResponse | null;
}

export function UserProfileWidget({ user }: UserProfileWidgetProps) {
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        User Profile
      </h2>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        Information retrieved from{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
          /auth/me
        </code>{" "}
        via TanStack Query
      </p>

      <dl className="mt-6 divide-y divide-neutral-100 dark:divide-neutral-800 text-sm">
        <div className="flex justify-between py-3">
          <dt className="text-neutral-500 dark:text-neutral-400">User ID</dt>
          <dd className="font-mono text-xs font-medium text-neutral-900 dark:text-neutral-100">
            {user?.id ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-neutral-500 dark:text-neutral-400">
            Display Name
          </dt>
          <dd className="font-medium text-neutral-900 dark:text-neutral-100">
            {user?.name ?? "Not set"}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-neutral-500 dark:text-neutral-400">
            Email Address
          </dt>
          <dd className="font-medium text-neutral-900 dark:text-neutral-100">
            {user?.email ?? "—"}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-neutral-500 dark:text-neutral-400">Role</dt>
          <dd className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
            {user?.role ?? "USER"}
          </dd>
        </div>
        <div className="flex justify-between py-3">
          <dt className="text-neutral-500 dark:text-neutral-400">
            Account Created
          </dt>
          <dd className="text-neutral-900 dark:text-neutral-100">
            {formattedDate}
          </dd>
        </div>
      </dl>
    </div>
  );
}
