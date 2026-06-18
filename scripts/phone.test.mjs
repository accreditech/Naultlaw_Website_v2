/**
 * Unit tests for US phone normalization (run with `node --test`).
 * Centers on the iPhone "+1" autofill case that silently dropped the last
 * digit of a real number in production.
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  toNationalDigits,
  isValidUsPhone,
  formatUsPhone,
} from "../src/lib/phone.mjs";

test("toNationalDigits: drops a leading +1 country code, keeps the real number", () => {
  // The exact failure mode seen in production: "+1 (801) 876-4280".
  assert.equal(toNationalDigits("+1 (801) 876-4280"), "8018764280");
  assert.equal(toNationalDigits("18018764280"), "8018764280");
  assert.equal(toNationalDigits("(801) 876-4280"), "8018764280");
  assert.equal(toNationalDigits("801.876.4280"), "8018764280");
  assert.equal(toNationalDigits(""), "");
});

test("toNationalDigits: leaves a bare 10-digit number untouched", () => {
  assert.equal(toNationalDigits("6155550100"), "6155550100");
});

test("formatUsPhone: formats progressively and survives the +1 autofill", () => {
  assert.equal(formatUsPhone(""), "");
  assert.equal(formatUsPhone("615"), "(615");
  assert.equal(formatUsPhone("615555"), "(615) 555");
  assert.equal(formatUsPhone("6155550100"), "(615) 555-0100");
  // Regression: the bug produced "(180) 187-6428"; the fix yields the real number.
  assert.equal(formatUsPhone("+1 (801) 876-4280"), "(801) 876-4280");
  assert.equal(formatUsPhone("18018764280"), "(801) 876-4280");
});

test("isValidUsPhone: accepts valid NANP numbers (incl. +1 prefixed)", () => {
  assert.equal(isValidUsPhone("(615) 555-0100"), true);
  assert.equal(isValidUsPhone("+1 (801) 876-4280"), true);
  assert.equal(isValidUsPhone("8018764280"), true);
});

test("isValidUsPhone: rejects impossible area codes/exchanges and wrong lengths", () => {
  assert.equal(isValidUsPhone("(180) 187-6428"), false); // area code starts with 1
  assert.equal(isValidUsPhone("0155550100"), false); // area code starts with 0
  assert.equal(isValidUsPhone("6150550100"), false); // exchange starts with 0
  assert.equal(isValidUsPhone("615"), false); // too short
  assert.equal(isValidUsPhone("61555501000"), false); // 11 digits, not a +1 prefix
  assert.equal(isValidUsPhone(""), false);
});
