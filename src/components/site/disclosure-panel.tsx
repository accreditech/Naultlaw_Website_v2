"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type DisclosurePanelProps = {
  title: string;
  paragraphs: readonly string[];
  defaultOpen?: boolean;
  tone?: "default" | "warning";
  className?: string;
};

export function DisclosurePanel({
  title,
  paragraphs,
  defaultOpen = false,
  tone = "default",
  className,
}: DisclosurePanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-sm",
        tone === "warning"
          ? "border-amber-200 bg-amber-50 text-amber-900"
          : "border-border bg-muted/40 text-foreground/70",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left font-medium"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-2 leading-6">
          {paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
    </div>
  );
}
