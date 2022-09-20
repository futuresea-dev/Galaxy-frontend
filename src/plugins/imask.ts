import IMask from "imask"
import { DateTime } from "luxon"

export type Country = "CZ"

export type MaskType =
  | "date"
  | "datetime"
  | "money"
  | "time"
  | "number"
  | "birthNumber"
  | "phone"
  | "zip"
  | "prefixPhone"
export type ReturnType = "int" | "float" | "string"

export type IMaskType =
  | Pick<IMask.MaskedNumber, "thousandsSeparator" | "radix" | "mask" | "max" | "scale">
  | Pick<IMask.MaskedDate, "mask" | "pattern" | "lazy" | "autofix">
  | Pick<IMask.MaskedRange, "mask" | "placeholderChar" | "from" | "to" | "maxLength" | "blocks">
  | Pick<IMask.MaskedPattern, "mask" | "lazy" | "placeholderChar">
  | Pick<IMask.MaskedPattern, "mask" | "lazy">

export type IMaskConfig = {
  date: Pick<IMask.MaskedDate, "mask" | "pattern" | "lazy" | "autofix" | "blocks" | "format" | "parse">
  datetime: Pick<IMask.MaskedDate, "mask" | "pattern" | "lazy" | "autofix" | "blocks" | "format" | "parse">
  time: Pick<IMask.MaskedDate, "mask" | "pattern" | "lazy" | "autofix" | "blocks" | "format" | "parse">
  money: Pick<IMask.MaskedNumber, "thousandsSeparator" | "radix" | "mask" | "max" | "scale">
  number: Pick<IMask.MaskedNumber, "thousandsSeparator" | "radix" | "mask" | "max" | "scale">
  birthNumber: Pick<IMask.MaskedPattern, "mask" | "lazy">
  phone: Pick<IMask.MaskedPattern, "mask" | "lazy" | "placeholderChar">
  zip: Pick<IMask.MaskedPattern, "mask" | "lazy" | "placeholderChar">
  prefixPhone: Pick<IMask.MaskedPattern, "mask" | "lazy" | "placeholderChar">
}

export const dateFormat = "dd.MM.yyyy"
export const dateTimeFormat = "dd.MM.yyyy HH:mm"
export const timeFormat = "HH:mm"

export const types: Record<Country, IMaskConfig> = {
  CZ: {
    date: {
      mask: Date,
      pattern: dateFormat,
      lazy: false,
      autofix: false,
      blocks: {
        dd: { mask: IMask.MaskedRange, placeholderChar: "d", from: 1, to: 31, maxLength: 2 },
        MM: { mask: IMask.MaskedRange, placeholderChar: "m", from: 1, to: 12, maxLength: 2 },
        yyyy: { mask: IMask.MaskedRange, placeholderChar: "y", from: 1900, to: 2999, maxLength: 4 },
      },
      format: function (date) {
        return DateTime.fromJSDate(date).toFormat(dateFormat)
      },
      parse: function (str) {
        return DateTime.fromFormat(str, dateFormat).toJSDate()
      },
    },
    datetime: {
      mask: Date,
      pattern: dateTimeFormat,
      lazy: false,
      autofix: false,
      blocks: {
        dd: { mask: IMask.MaskedRange, placeholderChar: "d", from: 1, to: 31, maxLength: 2 },
        MM: { mask: IMask.MaskedRange, placeholderChar: "m", from: 1, to: 12, maxLength: 2 },
        yyyy: { mask: IMask.MaskedRange, placeholderChar: "y", from: 1900, to: 2999, maxLength: 4 },
        HH: { mask: IMask.MaskedRange, placeholderChar: "h", from: 0, to: 23, maxLength: 2 },
        mm: { mask: IMask.MaskedRange, placeholderChar: "m", from: 0, to: 59, maxLength: 2 },
      },
      format: function (date) {
        return DateTime.fromJSDate(date).toFormat(dateTimeFormat)
      },
      parse: function (str) {
        return DateTime.fromFormat(str, dateTimeFormat).toJSDate()
      },
    },
    time: {
      mask: Date,
      pattern: timeFormat,
      lazy: false,
      autofix: false,
      blocks: {
        HH: { mask: IMask.MaskedRange, placeholderChar: "h", from: 0, to: 23, maxLength: 2 },
        mm: { mask: IMask.MaskedRange, placeholderChar: "m", from: 0, to: 59, maxLength: 2 },
      },
      format: function (date) {
        return DateTime.fromJSDate(date).toFormat(timeFormat)
      },
      parse: function (str) {
        return DateTime.fromFormat(str, timeFormat).toJSDate()
      },
    },
    money: {
      mask: Number,
      scale: 2,
      radix: ",",
      thousandsSeparator: " ",
      max: Math.round(Number.MAX_SAFE_INTEGER / 100),
    },
    number: {
      scale: 0,
      mask: Number,
      radix: ",",
      thousandsSeparator: " ",
      max: Math.round(Number.MAX_SAFE_INTEGER / 100),
    },
    phone: {
      mask: "000 000 000",
      lazy: false,
      placeholderChar: " ",
    },
    zip: {
      mask: "000 00",
      lazy: false,
      placeholderChar: " ",
    },
    birthNumber: {
      mask: "000000/000[0]",
      lazy: false,
    },
    prefixPhone: {
      mask: "+000",
      lazy: false,
      placeholderChar: " ",
    },
  },
}
