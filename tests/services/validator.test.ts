import { describe, expect, it } from "vitest"
import { zipCodeValidator } from "../../src/services/validator"

describe("validator test", () => {
  it.each([
    [54901, 54901],
    ["54901", "54901"],
  ])("zip validator right value (%s) -> %s", (value, expected) => {
    expect(zipCodeValidator().validateSync(value)).toBe(expected)
  })

  it.each([["abc"], [true], [false], [null], [undefined], ["549 01"]])(
    "zip validator error value (%s) -> %s",
    (value) => {
      expect(() => zipCodeValidator().validateSync(value)).toThrowError("PSČ není validní.")
    },
  )
})
