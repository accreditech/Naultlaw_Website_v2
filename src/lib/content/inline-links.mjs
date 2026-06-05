/**
 * Inline contextual-link tokenizer — the single source of truth shared by:
 *   - the React renderer   (src/components/site/inline-rich-text.tsx)
 *   - the build validator   (scripts/validate-inline-links.mjs)
 *   - the unit test         (scripts/inline-links.test.mjs)
 *
 * The parser the site renders is the exact parser the build validates and the
 * test covers. Plain ESM JavaScript (not TS) so Node 20 can run it directly in
 * the validator/test while the .tsx still imports it under `allowJs`.
 *
 * Token syntax, authored inside body / narrative strings:
 *     [visible anchor text](/internal/path)
 *
 * Rules:
 *  - Targets are INTERNAL paths only: must start with "/", must not be
 *    protocol-relative ("//…"), and must not contain a scheme (":"), whitespace,
 *    or parentheses. External URLs are rejected by design.
 *  - A bracket that is NOT part of a complete [text](/path) token is left as
 *    literal text. Legal prose legitimately uses brackets (e.g. "[sic]").
 *  - A token shaped like [text](target) whose target is not a clean internal
 *    path is malformed: the tokenizer THROWS, so it can never silently render
 *    as visible brackets and so `next build` fails on it (these strings render
 *    in Server Components at build time).
 */

/** The [anchor](target) shape. Anchor excludes brackets; target is everything
    up to the first ")". Both are captured so the caller can validate them. */
const LINK_TOKEN_SOURCE = "\\[([^\\[\\]]+)\\]\\(([^)]*)\\)";

/**
 * True only for a clean internal path: starts with a single "/", carries no
 * scheme, no protocol-relative "//", no whitespace, and no parentheses.
 * Query/hash are tolerated for completeness.
 * @param {unknown} href
 * @returns {boolean}
 */
export function isInternalLinkPath(href) {
  return typeof href === "string" && /^\/(?!\/)[^\s()]*$/.test(href);
}

/**
 * Find every [anchor](target) SHAPED token regardless of target validity.
 * Used by the build validator so it can report every problem at once instead
 * of throwing on the first. Does NOT validate the target.
 * @param {string} text
 * @returns {Array<{raw:string,anchor:string,href:string,index:number}>}
 */
export function findInlineLinkTokens(text) {
  if (typeof text !== "string") return [];
  const re = new RegExp(LINK_TOKEN_SOURCE, "g");
  const out = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    out.push({ raw: m[0], anchor: m[1], href: m[2], index: m.index });
  }
  return out;
}

/**
 * Split a body string into an ordered list of text/link tokens.
 * Throws on a [text](target) token whose target is not a clean internal path.
 * @param {string} text
 * @returns {Array<{type:"text",value:string}|{type:"link",anchor:string,href:string}>}
 */
export function tokenizeInlineLinks(text) {
  if (typeof text !== "string" || text.length === 0) {
    return text ? [{ type: "text", value: String(text) }] : [];
  }
  const re = new RegExp(LINK_TOKEN_SOURCE, "g");
  const tokens = [];
  let lastIndex = 0;
  let match;
  while ((match = re.exec(text)) !== null) {
    const [raw, anchor, href] = match;
    if (!isInternalLinkPath(href)) {
      throw new Error(
        `Malformed inline link token ${JSON.stringify(raw)}: target ` +
          `${JSON.stringify(href)} is not a clean internal path (must start ` +
          `with "/", no external URLs, no whitespace, no parentheses).`,
      );
    }
    if (match.index > lastIndex) {
      tokens.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    tokens.push({ type: "link", anchor, href });
    lastIndex = match.index + raw.length;
  }
  if (lastIndex < text.length) {
    tokens.push({ type: "text", value: text.slice(lastIndex) });
  }
  return tokens;
}
