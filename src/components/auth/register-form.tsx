"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import {
  type RegisterInput,
  registerSchema,
} from "@/lib/validation/auth-schema";

export interface RegisterFormProps {
  redirectTo?: string;
}

export function RegisterForm({ redirectTo }: RegisterFormProps) {
  const {
    register: registerUser,
    isRegistering,
    parseErrorMessage,
  } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    setErrorMessage(null);
    try {
      await registerUser(
        {
          email: values.email,
          password: values.password,
          name: values.name ? values.name : undefined,
        },
        redirectTo,
      );
    } catch (error) {
      setErrorMessage(parseErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {errorMessage ? (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400"
        >
          {errorMessage}
        </div>
      ) : null}

      <div className="space-y-1.5">
        <Label htmlFor="register-name">Name (optional)</Label>
        <Input
          id="register-name"
          type="text"
          placeholder="Alex Rivera"
          autoComplete="name"
          disabled={isRegistering}
          {...register("name")}
        />
        {errors.name ? (
          <p className="text-xs text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          disabled={isRegistering}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          disabled={isRegistering}
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-xs text-red-600 dark:text-red-400">
            {errors.password.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="w-full" disabled={isRegistering}>
        {isRegistering ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}
