import { expect, test } from "vitest";
import validationPatterns from "../../validationPatterns";

function testPattern(validationPattern: any, value: any) {
  const regex = new RegExp(validationPattern);
  return regex.test(value);
}

const validationPattern = validationPatterns["global"]["password"].pattern;

const testVariants = [
  ["", false],
  ["pass", false],
  ["password", false],
  ["P4ssword", false],
  ["P4ssword!P4ssword!123", false],
  ["P4ssword!", true],
];

test.each(testVariants)("testVariants passes for valid value %j with result %j", (fixture: any, result: any) =>
  expect(testPattern(validationPattern, fixture)).toBe(result)
);
