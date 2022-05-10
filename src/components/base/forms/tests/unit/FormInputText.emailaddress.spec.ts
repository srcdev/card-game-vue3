import { test } from "vitest";
import validationPatterns from "../../validationPatterns";

function testPattern(validationPattern: any, value: any) {
  const regex = new RegExp(validationPattern);
  return regex.test(value);
}

const validationPattern = validationPatterns["global"]["emailaddress"].pattern;

const testVariants = [
  ["nobby@neighbourly.com", true],
  ["123.nobby@neighbourly.co.uk", true],
  ["123.nobby!neighbourly.co.uk", false],
  ["@neighbourly.co.uk", false],
  ["123.nobby@n.c", false],
  ["nobby@.com", false],
  ["nobby@", false],
];

test.each(testVariants)("testVariants passes for valid value %j with result %j", (fixture: any, result: any) =>
  expect(testPattern(validationPattern, fixture)).toBe(result)
);
