import { expect, test } from "vitest";
import validationPatterns from "../../validationPatterns";

function testPattern(validationPattern: any, value: any) {
  const regex = new RegExp(validationPattern);
  return regex.test(value);
}

const validationPattern = validationPatterns["en-GB"]["postcode"].pattern;

const testVariants = [
  ["sw1a 1ab", true],
  ["ba2 1ab", true],
  ["b1 1ab", true],
  ["b11 2ab", true],
  ["b123 2abc", false],
  ["b 1a", false],
  ["b 1", false],
  ["b1 a", false],
  ["b1 aa", false],
  ["baa1 aa", false],
];

test.each(testVariants)("testVariants passes for valid value %j with result %j", (fixture: any, result: any) =>
  expect(testPattern(validationPattern, fixture)).toBe(result)
);
