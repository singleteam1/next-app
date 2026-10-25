export function AuthCardSkeleton() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mb-6 text-center">
        <div className="mx-auto h-7 w-40 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        <div className="mx-auto mt-2 h-4 w-56 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800/60" />
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-9 w-full animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800/60" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-9 w-full animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800/60" />
        </div>
        <div className="h-9 w-full animate-pulse rounded-md bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  );
}
