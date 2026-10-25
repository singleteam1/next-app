"use client";

import { KeyRound, User } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/lib/routes";

export function UserButton() {
  const { isAuthenticated, user, isLoadingUser } = useAuth();

  if (isLoadingUser) {
    return <div className="h-8 w-24 animate-pulse rounded-lg bg-muted/60" />;
  }

  if (isAuthenticated && user) {
    return (
      <Link
        href={ROUTES.DASHBOARD}
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className:
            "hidden sm:inline-flex items-center gap-1.5 border-border/80 hover:border-brand/40 hover:text-brand max-w-[200px]",
        })}
      >
        <User className="size-3.5 shrink-0 text-muted-foreground" />
        <span className="truncate">{user.email}</span>
      </Link>
    );
  }

  return (
    <Link
      href={ROUTES.AUTH.LOGIN()}
      className={buttonVariants({
        variant: "outline",
        size: "sm",
        className:
          "hidden sm:inline-flex border-border/80 hover:border-brand/40 hover:text-brand",
      })}
    >
      <KeyRound className="size-3.5 mr-1" />
      Sign in
    </Link>
  );
}
