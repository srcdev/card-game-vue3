import { expect, test } from "vitest";
import validationPatterns from "../../validationPatterns";

function testPattern(validationPattern: any, value: any) {
  const regex = new RegExp(validationPattern);
  return regex.test(value);
}

const validationPattern = validationPatterns["es-ES"]["postcode"].pattern;

const testVariants = [
  ["1", false],
  ["12", false],
  ["123", false],
  ["1234", false],
  ["12345", true],
  ["123456", false],
  ["a", false],
  ["ab", false],
  ["abc", false],
  ["abcd", false],
  ["abcde", false],
  ["a1a1a", false],
];

test.each(testVariants)("testVariants passes for valid value %j with result %j", (fixture: any, result: any) =>
  expect(testPattern(validationPattern, fixture)).toBe(result)
);
