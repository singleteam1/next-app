"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { RegisterForm } from "@/components/auth/register-form";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";

export function RegisterCard() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || undefined;
  const loginUrl = ROUTES.AUTH.LOGIN(redirectTo);

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          Create an Account
        </h1>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Get started with your new account
        </p>
      </div>

      <RegisterForm redirectTo={redirectTo} />

      <div className="mt-6 border-t border-neutral-100 pt-5 text-center dark:border-neutral-800">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Already have an account?{" "}
          <Link
            href={loginUrl}
            className={buttonVariants({
              variant: "link",
              size: "sm",
              className:
                "p-0 h-auto font-semibold text-neutral-900 hover:underline dark:text-neutral-100",
            })}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
