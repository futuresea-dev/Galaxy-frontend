import { defineStore } from "pinia"
import {
  LastRecords,
  LastRecord,
  OpeningRecordBoxData,
  ProgressBarInfo,
  UserRecordProgressResponse,
} from "../api/types"
import { useRequest } from "../requestor"
import { DateTime } from "luxon"
import { api, RequestId } from "../api"

interface recordBox {
  statistics: OpeningRecordBoxData
  lastRecords: LastRecords
}

export const useRecordBoxStore = defineStore("recordBox", {
  state: (): recordBox => generateFakeData(),
  getters: {
    person: (state) => state.statistics.meeting.person,
    investment: (state) => state.statistics.meeting.investment,
    property: (state) => state.statistics.meeting.property,
    vehicle: (state) => state.statistics.meeting.vehicle,
    pension: (state) => state.statistics.meeting.pension,
    loan: (state) => state.statistics.meeting.loan,
    industry: (state) => state.statistics.meeting.industry,
    openingRecord: (state) => state.statistics.openingRecord,
    lastRecordPerson: (state) => state.lastRecords.person,
    lastRecordInvestment: (state) => state.lastRecords.investment,
    lastRecordProperty: (state) => state.lastRecords.property,
    lastRecordVehicle: (state) => state.lastRecords.vehicle,
    lastRecordPension: (state) => state.lastRecords.pension,
    lastRecordLoan: (state) => state.lastRecords.loan,
    lastRecordIndustry: (state) => state.lastRecords.industry,
  },
  actions: {
    async fill() {
      await this.fillRecordProgress()
      await this.fillLastRecords()
    },
    async fillLastRecords() {
      const { execute, result } = useRequest<LastRecords>()
      await execute(api.lastRecords(42), RequestId.lastRecords)
      if (result.value) {
        this.lastRecords = {
          investment: result.value.investment,
          person: result.value.person,
          property: result.value.property,
          loan: result.value.loan,
          vehicle: result.value.vehicle,
          industry: result.value.industry,
          pension: result.value.pension,
        }
      }
    },
    async fillRecordProgress() {
      const ensure = (argument: ProgressBarInfo | undefined | null) => {
        if (argument === undefined || argument === null) {
          throw new TypeError("Item not found")
        }
        return argument
      }
      const { execute, result } = useRequest<UserRecordProgressResponse>()
      const current = DateTime.now()
      const last = DateTime.now().minus({ month: 1 })
      await execute(
        api.userRecordProgress(12, [
          { year: current.year, month: current.month },
          { year: last.year, month: last.month },
        ]),
        RequestId.userRecordProgress,
      )
      if (result.value) {
        this.statistics = {
          meeting: {
            person: {
              last: ensure(
                result.value.meeting.person.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.person.find((item) => item.month === current.month && item.year === current.year),
              ),
            },
            investment: {
              last: ensure(
                result.value.meeting.investment.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.investment.find(
                  (item) => item.month === current.month && item.year === current.year,
                ),
              ),
            },
            property: {
              last: ensure(
                result.value.meeting.property.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.property.find(
                  (item) => item.month === current.month && item.year === current.year,
                ),
              ),
            },
            vehicle: {
              last: ensure(
                result.value.meeting.vehicle.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.vehicle.find((item) => item.month === current.month && item.year === current.year),
              ),
            },
            pension: {
              last: ensure(
                result.value.meeting.pension.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.pension.find((item) => item.month === current.month && item.year === current.year),
              ),
            },
            loan: {
              last: ensure(
                result.value.meeting.loan.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.loan.find((item) => item.month === current.month && item.year === current.year),
              ),
            },
            industry: {
              last: ensure(
                result.value.meeting.industry.find((item) => item.month === last.month && item.year === last.year),
              ),
              current: ensure(
                result.value.meeting.industry.find(
                  (item) => item.month === current.month && item.year === current.year,
                ),
              ),
            },
          },
          openingRecord: {
            last: ensure(
              result.value.openingRecord.find((item) => item.month === last.month && item.year === last.year),
            ),
            current: ensure(
              result.value.openingRecord.find((item) => item.month === current.month && item.year === current.year),
            ),
          },
        }
      }
    },
  },
})

function generateFakeProgressBarInfo(): ProgressBarInfo {
  return {
    year: 0,
    month: 0,
    recordsCount: 0,
    recordsGoal: 0,
  }
}

function generateFakeLastRecord(): LastRecord {
  return {
    name: "Jan Novák",
    date: "20.04.2002",
    finished: true,
    id: 1,
  }
}

function generateFakeData(): recordBox {
  return {
    statistics: {
      meeting: {
        person: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
        investment: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
        property: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
        vehicle: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
        pension: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
        loan: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
        industry: {
          last: generateFakeProgressBarInfo(),
          current: generateFakeProgressBarInfo(),
        },
      },
      openingRecord: {
        last: generateFakeProgressBarInfo(),
        current: generateFakeProgressBarInfo(),
      },
    },
    lastRecords: {
      person: generateFakeLastRecord(),
      investment: generateFakeLastRecord(),
      property: generateFakeLastRecord(),
      vehicle: generateFakeLastRecord(),
      pension: generateFakeLastRecord(),
      loan: generateFakeLastRecord(),
      industry: generateFakeLastRecord(),
    },
  }
}
