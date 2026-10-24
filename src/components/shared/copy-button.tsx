"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy code command"
      className="inline-flex size-8 items-center justify-center rounded-md border border-border/60 bg-muted/50 text-muted-foreground transition-all hover:border-brand/50 hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500 transition-transform duration-200" />
      ) : (
        <Copy className="size-3.5" />
      )}
    </button>
  );
}
