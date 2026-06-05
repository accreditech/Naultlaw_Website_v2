/**
 * Unit tests for the inline-link tokenizer (run with `node --test`).
 * Covers normal tokens, no-link prose, adjacent tokens, and malformed cases.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  isInternalLinkPath,
  tokenizeInlineLinks,
  findInlineLinkTokens,
} from "../src/lib/content/inline-links.mjs";

test("isInternalLinkPath: accepts clean internal paths, rejects the rest", () => {
  assert.equal(isInternalLinkPath("/services/llc-formation-attorney-tennessee"), true);
  assert.equal(isInternalLinkPath("/articles/foo"), true);
  assert.equal(isInternalLinkPath("/"), true);
  assert.equal(isInternalLinkPath("/x?a=1#b"), true);
  assert.equal(isInternalLinkPath("//evil.com"), false); // protocol-relative
  assert.equal(isInternalLinkPath("https://evil.com"), false); // scheme
  assert.equal(isInternalLinkPath("services/foo"), false); // no leading slash
  assert.equal(isInternalLinkPath("/a b"), false); // whitespace
  assert.equal(isInternalLinkPath("/a(b)"), false); // parens
  assert.equal(isInternalLinkPath(""), false);
  assert.equal(isInternalLinkPath(null), false);
});

test("tokenizes a single link woven into a sentence", () => {
  const tokens = tokenizeInlineLinks(
    "I handle [LLC formation](/services/llc-formation-attorney-tennessee) for owners.",
  );
  assert.deepEqual(tokens, [
    { type: "text", value: "I handle " },
    {
      type: "link",
      anchor: "LLC formation",
      href: "/services/llc-formation-attorney-tennessee",
    },
    { type: "text", value: " for owners." },
  ]);
});

test("prose with no token passes through as a single text token", () => {
  const tokens = tokenizeInlineLinks("No links here at all.");
  assert.deepEqual(tokens, [{ type: "text", value: "No links here at all." }]);
});

test("bare brackets in prose are NOT treated as a link", () => {
  const tokens = tokenizeInlineLinks("The record said [sic] and moved on.");
  assert.deepEqual(tokens, [
    { type: "text", value: "The record said [sic] and moved on." },
  ]);
});

test("adjacent tokens produce no phantom text between them", () => {
  const tokens = tokenizeInlineLinks("[a](/x)[b](/articles/y)");
  assert.deepEqual(tokens, [
    { type: "link", anchor: "a", href: "/x" },
    { type: "link", anchor: "b", href: "/articles/y" },
  ]);
});

test("leading and trailing links are handled without empty text tokens", () => {
  const tokens = tokenizeInlineLinks("[start](/a) middle [end](/b)");
  assert.deepEqual(tokens, [
    { type: "link", anchor: "start", href: "/a" },
    { type: "text", value: " middle " },
    { type: "link", anchor: "end", href: "/b" },
  ]);
});

test("throws on an external target", () => {
  assert.throws(
    () => tokenizeInlineLinks("see [here](https://evil.com) now"),
    /not a clean internal path/,
  );
});

test("throws on a target missing the leading slash", () => {
  assert.throws(
    () => tokenizeInlineLinks("see [here](services/foo) now"),
    /not a clean internal path/,
  );
});

test("findInlineLinkTokens reports shaped tokens without validating", () => {
  const found = findInlineLinkTokens("a [x](/good) b [y](bad) c");
  assert.equal(found.length, 2);
  assert.equal(found[0].href, "/good");
  assert.equal(found[1].href, "bad");
});

test("empty / non-string input is safe", () => {
  assert.deepEqual(tokenizeInlineLinks(""), []);
  assert.deepEqual(findInlineLinkTokens(""), []);
});
