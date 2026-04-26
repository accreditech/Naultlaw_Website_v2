"use client";

import { buttonVariants } from "@/components/ui/button-variants";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  return (
    <main
      id="main-content"
      className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Error
      </p>
      <h1 className="mt-4 font-heading text-3xl tracking-tight text-foreground sm:text-4xl">
        Something went wrong.
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
        An unexpected error occurred. You can try again or return to the home
        page.
      </p>
      {error.digest && (
        <p className="mt-2 font-mono text-xs text-muted-foreground/60">
          {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <button onClick={reset} className={buttonVariants({ variant: "default" })}>
          Try Again
        </button>
        <a href="/" className={buttonVariants({ variant: "outline" })}>
          Return Home
        </a>
      </div>
    </main>
  );
}
