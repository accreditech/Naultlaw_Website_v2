/**
 * Shared prose-list convention for authored body content.
 *
 * A paragraph is normally rendered as a <p>. Two opt-in prefixes turn a
 * paragraph into a list item instead — "- " for a bullet and "1. " (any
 * digits) for a numbered step — and consecutive items of the same kind
 * collapse into a single list.
 *
 * Content that uses neither prefix is unaffected, which is every page and
 * article authored before this convention existed. Consumers render the
 * blocks with their own typography classes:
 *   - BOFU service sections  (src/components/sections/bofu-service-section.tsx)
 *   - Article bodies         (src/app/articles/[slug]/page.tsx)
 */

export type ProseBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: string[] };

export function toBlocks(paragraphs: string[]): ProseBlock[] {
  const blocks: ProseBlock[] = [];

  for (const paragraph of paragraphs) {
    const bullet = /^- ([\s\S]*)$/.exec(paragraph);
    const ordered = /^\d+\. ([\s\S]*)$/.exec(paragraph);
    const last = blocks[blocks.length - 1];

    if (bullet) {
      if (last?.kind === "ul") last.items.push(bullet[1]);
      else blocks.push({ kind: "ul", items: [bullet[1]] });
    } else if (ordered) {
      if (last?.kind === "ol") last.items.push(ordered[1]);
      else blocks.push({ kind: "ol", items: [ordered[1]] });
    } else {
      blocks.push({ kind: "p", text: paragraph });
    }
  }

  return blocks;
}
