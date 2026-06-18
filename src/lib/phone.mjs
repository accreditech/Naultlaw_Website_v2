/**
 * US-only phone-number normalization — the single source of truth shared by:
 *   - the contact intake form    (src/components/contact/intake-form.tsx)
 *   - the BOFU inline intake      (src/components/sections/bofu-inline-intake.tsx)
 *   - the server intake schema    (src/lib/intake.ts)
 *   - the unit test               (scripts/phone.test.mjs)
 *
 * Plain ESM JavaScript (not TS) so Node 20 can run it directly in the test
 * while the .tsx/.ts files import it under `allowJs` — same pattern as
 * src/lib/content/inline-links.mjs.
 *
 * The practice does not take international matters and would not call an
 * international number, so every inbound number is treated as a US / North
 * American Numbering Plan (NANP) number.
 *
 * Why this exists: iPhone (and any contact-card autofill) commonly fills the
 * field as "+1 (XXX) XXX-XXXX". Naively keeping the first 10 digits counts the
 * country-code "1" as the first digit and silently drops the LAST real digit
 * (e.g. "+1 (801) 876-4280" became "(180) 187-6428"). Stripping the "1" first
 * keeps the real number intact. No NANP area code starts with "1", so an
 * 11-digit string led by "1" is unambiguously a "+1" country code.
 */

/**
 * Reduce any input to the digits of the national number. Drops a leading US
 * country-code "1" from an 11-digit string, then caps at 10 digits.
 * @param {string} raw
 * @returns {string}
 */
export function toNationalDigits(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * True only for a complete, valid 10-digit NANP number. After dropping a
 * leading "+1", the area code and exchange (the 1st and 4th digits) must be
 * 2–9 — never 0 or 1 — and the number must be exactly 10 digits.
 * @param {string} raw
 * @returns {boolean}
 */
export function isValidUsPhone(raw) {
  let digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    digits = digits.slice(1);
  }
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
}

/**
 * Format for display, progressively as the user types, e.g. "(615) 555-0100".
 * Non-digits and a leading "+1" are stripped first; empty input returns "".
 * @param {string} raw
 * @returns {string}
 */
export function formatUsPhone(raw) {
  const digits = toNationalDigits(raw);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
