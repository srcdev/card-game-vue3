import { expect, test } from "vitest";
import validationPatterns from "../../validationPatterns";

function testPattern(validationPattern: any, value: any) {
  const regex = new RegExp(validationPattern);
  return regex.test(value);
}

const validationPattern = validationPatterns["en-US"]["postcode"].pattern;

const testVariants = [
  ["1", false],
  ["12", false],
  ["123", false],
  ["1234", false],
  ["12345", true],
  ["123456", false],
  ["112345-", false],
  ["12345-1", false],
  ["12345-12", false],
  ["12345-123", false],
  ["12345-1234", true],
  ["123451234", true],
  ["12345-12345", false],
];

test.each(testVariants)("testVariants passes for valid value %j with result %j", (fixture: any, result: any) =>
  expect(testPattern(validationPattern, fixture)).toBe(result)
);
