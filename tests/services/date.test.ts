import { describe, expect, it } from "vitest"
import { toDate, toDateTime, toMonthLong, toTime } from "../../src/services/date"
import { Settings } from "luxon"

const datetime = "2022-04-21T09:19:03+00:00"

describe("date service test", () => {
  Settings.defaultLocale = "cs-Cz"
  Settings.defaultZone = "utc"

  it("datetime", async () => {
    expect(toDateTime(datetime)).toBe("21. 4. 2022 9:19")
  })

  it("date", async () => {
    expect(toDate(datetime)).toBe("21. 4. 2022")
  })

  it("time", async () => {
    expect(toTime(datetime)).toBe("9:19")
  })

  it("monthLong", async () => {
    expect(toMonthLong(datetime)).toBe("duben")
  })
})
