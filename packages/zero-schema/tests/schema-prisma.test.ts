import { expect, test } from "vitest";
import { generateZeroId } from "@zeroopensource/zero-id";

const ZERO_ID_PATTERN = /^zero-\d{8}-([0-9a-f]{6}-){3}[0-9a-f]{6}$/;

test("generateZeroId", () => {
  const id = generateZeroId();
  expect(id).toMatch(ZERO_ID_PATTERN);
});
