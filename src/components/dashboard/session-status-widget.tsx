"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

export function SessionStatusWidget() {
  const { refetchUser } = useAuth();
  const [testingStatus, setTestingStatus] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const handleTestProtectedRequest = async () => {
    setIsTesting(true);
    setTestingStatus(null);
    try {
      const result = await refetchUser();
      if (result.isSuccess) {
        setTestingStatus(
          `Protected request succeeded at ${new Date().toLocaleTimeString()}! Status: 200 OK`,
        );
      } else {
        setTestingStatus(`Request failed: ${String(result.error)}`);
      }
    } catch (err) {
      setTestingStatus(
        `Error: ${err instanceof Error ? err.message : String(err)}`,
      );
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-950">
      <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
        Session & Security Status
      </h2>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        JWT authentication and automatic 401 interception architecture
      </p>

      <div className="mt-4 space-y-3 text-xs">
        <div className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Access Token (45 Minutes TTL)
          </p>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Stored in client cookie + memory. Transmitted via{" "}
            <code className="rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-800">
              Authorization: Bearer
            </code>{" "}
            header.
          </p>
        </div>

        <div className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            Refresh Token (7 Days TTL)
          </p>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            Stored in an{" "}
            <code className="rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-800">
              HttpOnly
            </code>{" "}
            cookie on{" "}
            <code className="rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-800">
              /auth
            </code>
            . Sent automatically with credentials.
          </p>
        </div>

        <div className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-900">
          <p className="font-medium text-neutral-900 dark:text-neutral-100">
            401 Interception & Auto-Logout
          </p>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            If an access token expires while calling protected endpoints, Axios
            intercepts 401, calls{" "}
            <code className="rounded bg-neutral-200 px-1 py-0.5 dark:bg-neutral-800">
              /auth/refresh
            </code>
            , retries the original request, and performs auto-logout only if the
            refresh fails.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleTestProtectedRequest}
          disabled={isTesting}
        >
          {isTesting ? "Testing /auth/me..." : "Test Protected API Call"}
        </Button>

        {testingStatus ? (
          <p className="rounded-md border border-neutral-200 bg-neutral-50 p-2 text-center text-xs font-mono text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
            {testingStatus}
          </p>
        ) : null}
      </div>
    </div>
  );
}
