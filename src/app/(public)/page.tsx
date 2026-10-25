import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  FolderTree,
  GitBranch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

import { CopyButton } from "@/components/shared/copy-button";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Quick Start Next.js Template",
  description:
    "A production-ready Next.js quick-start template featuring JWT auth, fully configured environment, Biome linting, Git commitlint hooks, and modular folder architecture.",
};

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "JWT Authentication",
    badge: "Security",
    description:
      "Robust JSON Web Token authentication system with secure token management, auth middleware, and protected account routes.",
    accent: "from-brand/20 to-brand/5",
    tag: "Ready to use",
  },
  {
    icon: SlidersHorizontal,
    title: "Full Configured Env",
    badge: "Config",
    description:
      "Type-safe environment variable schema with runtime validation, client/server secret isolation, and sample template files.",
    accent: "from-brand/20 to-brand/5",
    tag: "Type-Safe",
  },
  {
    icon: Sparkles,
    title: "Linting & Formatting",
    badge: "Code Quality",
    description:
      "Pre-configured Biome and Prettier integration delivering blazingly fast checks, strict lint rules, and unified code formatting.",
    accent: "from-brand/20 to-brand/5",
    tag: "Biome + Prettier",
  },
  {
    icon: GitBranch,
    title: "Git & Commitlint",
    badge: "DevOps",
    description:
      "Built-in simple-git-hooks and conventional commitlint validation to enforce clean commit history and automated pre-commit stages.",
    accent: "from-brand/20 to-brand/5",
    tag: "Git Hooks",
  },
  {
    icon: FolderTree,
    title: "Modular Folder Arc",
    badge: "Architecture",
    description:
      "Clean directory architecture organizing route groups, reusable UI primitives, providers, and shared utilities for instant scalability.",
    accent: "from-brand/20 to-brand/5",
    tag: "Scalable Pattern",
  },
  {
    icon: Boxes,
    title: "Modern Stack & UI",
    badge: "Core",
    description:
      "Next.js 16 App Router, React 19, Tailwind CSS v4, Base UI primitives, and React Query with seamless dark/light mode support.",
    accent: "from-brand/20 to-brand/5",
    tag: "Next.js 16 + React 19",
  },
];

const FOLDER_STRUCTURE = [
  { path: "src/app/(public)/", note: "Public landing & marketing pages" },
  {
    path: "src/app/layout.tsx",
    note: "Global fonts, SEO metadata & providers",
  },
  {
    path: "src/components/ui/",
    note: "Accessible Base UI & Tailwind primitives",
  },
  { path: "src/components/shared/", note: "Shared application widgets" },
  { path: "src/lib/config/env.ts", note: "Type-safe env configuration" },
  { path: "src/lib/routes.ts", note: "Centralized route definitions" },
  { path: "src/providers/", note: "Query & theme context providers" },
  { path: "simple-git-hooks.mjs", note: "Pre-commit & commit-msg hooks" },
];

const QUICK_COMMANDS = [
  { label: "Install dependencies", cmd: "bun install" },
  { label: "Copy environment setup", cmd: "cp .env.example .env" },
  { label: "Pull server", cmd: "peak pull elysia-app" },
  { label: "Start development server", cmd: "bun run dev" },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand/20 via-brand-soft/30 to-transparent blur-3xl opacity-75 dark:opacity-35"
      />
      <main className="page-container sm:py-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-between py-20 px-12 text-center bg-brand-soft rounded-3xl">
          {/* Heading */}
          <h1 className="mt-6 text-display-2xl font-bold tracking-tight text-foreground sm:leading-[1.1]">
            Build faster with{" "}
            <span className="bg-gradient-to-r from-brand via-brand/90 to-primary bg-clip-text text-transparent">
              Next-app
            </span>
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
            A battle-tested starter template for your next project. Ship with
            confidence with pre-configured <strong>JWT authentication</strong>,{" "}
            <strong>strict env validation</strong>,{" "}
            <strong>Biome linting</strong>, <strong>Git commit hooks</strong>,
            and a clean <strong>folder architecture</strong>.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#quickstart"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-brand text-white shadow-md shadow-brand/25 hover:bg-brand/90 px-6 py-2.5 font-medium",
              })}
            >
              Get Started in Minutes
              <ArrowRight className="size-4 ml-1.5" />
            </a>
            <a
              href="#architecture"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "border-border hover:border-brand/40 hover:bg-brand-soft/30 px-6 py-2.5 font-medium",
              })}
            >
              <FolderTree className="size-4 mr-1.5 text-brand" />
              View Folder Arc
            </a>
          </div>

          {/* Quick Terminal Snippet */}
          <div className="mt-10 w-full max-w-xl rounded-xl border border-border/80 bg-card/70 p-3 shadow-lg shadow-black/5 backdrop-blur-sm">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/40 px-3.5 py-2.5 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2 overflow-x-auto text-foreground">
                <span className="text-brand font-bold select-none">$</span>
                <code>peak pull elysia-app</code>
              </div>
              <CopyButton text="npx peakcli-pull next-app" />
            </div>
          </div>

          {/* Quick Tech Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              Next.js 16 (App Router)
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              React 19
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              TypeScript 5
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              Tailwind CSS v4
            </span>
            <span className="rounded-md border border-border/70 bg-card px-2.5 py-1">
              Biome Linter
            </span>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section id="features" className="mt-24 scroll-mt-20">
          <div className="text-center">
            <span className="inline-block font-mono text-xs font-semibold tracking-wider text-brand uppercase">
              Template Highlights
            </span>
            <h2 className="mt-2 text-display-lg font-bold tracking-tight text-foreground">
              Everything Configured, Nothing Left Blank
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
              Say goodbye to hours of boilerplate setup. Next-app brings a solid
              foundation designed for maintainability and speed.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md hover:shadow-brand/5 dark:bg-card/60"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white dark:bg-brand/15">
                        <Icon className="size-5" />
                      </div>
                      <span className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
                        {feature.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-brand">
                    <CheckCircle2 className="size-3.5" />
                    <span>Included in template</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Folder Arc & Architecture Preview */}
        <section id="architecture" className="mt-24 scroll-mt-20">
          <div className="rounded-3xl border border-border/80 bg-gradient-to-br from-card via-card to-brand-soft/20 p-6 sm:p-10 shadow-sm dark:to-brand/5">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <span className="inline-block font-mono text-xs font-semibold tracking-wider text-brand uppercase">
                  Folder Arc
                </span>
                <h2 className="mt-2 text-display-md font-bold tracking-tight text-foreground">
                  Organized for Clean Code & Growth
                </h2>
                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  The folder architecture separates routes, UI primitives,
                  providers, and configuration cleanly. Easily scale from a
                  small side project to a large enterprise application.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Route Groups:</strong>{" "}
                      Isolated public and authenticated route layouts.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Configuration Layer:
                      </strong>{" "}
                      Centralized route paths & validated environment.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <CheckCircle2 className="size-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">
                        Automated Git:
                      </strong>{" "}
                      Pre-commit checks prevent broken code from hitting repos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Folder Tree Box */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border/90 bg-brand-soft/10 p-4 sm:p-6 text-zinc-100 shadow-xl">
                  <div className="flex items-center justify-between border-b border-brand/80 pb-3 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <div className="size-2.5 rounded-full bg-rose-500/80" />
                      <div className="size-2.5 rounded-full bg-amber-500/80" />
                      <div className="size-2.5 rounded-full bg-emerald-500/80" />
                      <span className="ml-2 text-zinc-500 font-sans font-medium">
                        next-app architecture
                      </span>
                    </div>
                    <span>src/</span>
                  </div>

                  <div className="mt-4 space-y-2 font-mono text-xs sm:text-sm">
                    {FOLDER_STRUCTURE.map((item) => (
                      <div
                        key={item.path}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 rounded-md px-2 py-1.5 transition-colors hover:bg-brand-soft"
                      >
                        <span className="text-brand font-medium">
                          {item.path}
                        </span>
                        <span className="text-zinc-400 text-[11px] sm:text-xs">
                          {item.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quickstart Command Section */}
        <section id="quickstart" className="mt-24 scroll-mt-20">
          <div className="text-center">
            <span className="inline-block font-mono text-xs font-semibold tracking-wider text-brand uppercase">
              Ready to code
            </span>
            <h2 className="mt-2 text-display-lg font-bold tracking-tight text-foreground">
              Get Started in {QUICK_COMMANDS.length} Steps
            </h2>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm sm:text-base">
              Spin up your new Next.js application template locally in under a
              minute.
            </p>
          </div>

          <div className="mt-10 mx-auto max-w-2xl space-y-4">
            {QUICK_COMMANDS.map((step, idx) => (
              <div
                key={step.cmd}
                className="flex flex-col gap-2 rounded-xl border border-border/80 bg-card p-4 sm:flex-row sm:items-center sm:justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand-soft text-xs font-bold text-brand dark:bg-brand/20">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {step.label}
                    </p>
                    <code className="font-mono text-sm font-semibold text-foreground">
                      {step.cmd}
                    </code>
                  </div>
                </div>
                <div className="self-end sm:self-center">
                  <CopyButton text={step.cmd} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
