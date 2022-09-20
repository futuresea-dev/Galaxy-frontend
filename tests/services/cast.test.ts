import { describe, expect, it } from "vitest"
import { convertToInt, convertToString } from "../../src/services/cast"

describe("cast test", () => {
  it.each([
    [1, 1],
    ["1", 1],
    [undefined, 0],
    [null, 0],
    [Number.MAX_SAFE_INTEGER, 9007199254740991],
    ["90071992547409912", 90071992547409920], // bigint
    ["123 456 789", 123456789],
    ["546 04", 54604],
  ])("convertToInt test (%s) -> %s", (value, expected) => {
    expect(convertToInt(value)).toBe(expected)
  })

  it.each([
    [1, "1"],
    ["1", "1"],
    [undefined, ""],
    [null, ""],
    [BigInt("90071992547409912"), "90071992547409912"],
  ])("convertToString test (%s) -> %s", (value, expected) => {
    expect(convertToString(value)).toBe(expected)
  })
})
