import { DateTime } from "luxon"

export const toDateTime = (datetime: string) => {
  return DateTime.fromISO(datetime).toLocaleString(DateTime.DATETIME_SHORT)
}

export const toDate = (datetime: string) => {
  return DateTime.fromISO(datetime).toLocaleString(DateTime.DATE_SHORT)
}

export const toTime = (datetime: string) => {
  return DateTime.fromISO(datetime).toLocaleString(DateTime.TIME_24_SIMPLE)
}

export const toMonthLong = (datetime: string) => {
  return DateTime.fromISO(datetime).monthLong
}
