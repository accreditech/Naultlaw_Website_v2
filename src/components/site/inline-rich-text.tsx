import Link from "next/link";
import type { ReactNode } from "react";
import { tokenizeInlineLinks } from "@/lib/content/inline-links.mjs";

/** In-body contextual link treatment — a quiet underline matching the existing
    editorial link style used elsewhere (see bofu-service-section.tsx). */
const INLINE_LINK_CLASS =
  "font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent";

/**
 * Render a body string, converting `[anchor](/path)` tokens into Next `<Link>`s
 * while leaving the surrounding prose untouched. Returns a ReactNode safe to
 * drop directly inside a `<p>`. Paragraphs with no token render as the original
 * string, so non-linked copy is byte-for-byte unchanged.
 *
 * Malformed tokens throw inside `tokenizeInlineLinks` — during a Server
 * Component render that surfaces as a build failure, never as visible brackets.
 */
export function renderInlineLinks(text: string): ReactNode {
  const tokens = tokenizeInlineLinks(text);
  if (tokens.length === 1 && tokens[0].type === "text") return text;
  return tokens.map((token, i) =>
    token.type === "link" ? (
      <Link key={i} href={token.href} className={INLINE_LINK_CLASS}>
        {token.anchor}
      </Link>
    ) : (
      token.value
    ),
  );
}
