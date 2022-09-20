import { MixedSchema } from "yup/lib/mixed"
import { mixed, number, string } from "yup"
import { i18n } from "../plugins/i18n"
import { rodnecislo } from "rodnecislo"
import { DateTime } from "luxon"
import { dateFormat, dateTimeFormat, timeFormat } from "../plugins/imask"
import { parsePhoneNumber } from "libphonenumber-js"
import { CountryCode } from "libphonenumber-js/types"
import { convertToString } from "./cast"
import validateIc from "ic-validator"

const t = i18n.global.t

/**
 * @param size in MB
 * @param ext
 */
export const fileValidator = (size: number, ext: string[] = []): MixedSchema => {
  return mixed()
    .test("fileSize", t("validator.fileSize"), (file: File) => {
      return file.size / (1024 * 1024) <= size
    })
    .test("fileExt", t("validator.fileExt"), (file: File) => {
      const fileExt = file.name.split(".").pop()

      return ext.length ? ext.includes(fileExt || "unknown") : true
    })
}

export const birthNumberValidator = () => {
  return string().test("birthNumber", t("validator.birthNumber"), (value?: string) => {
    if (!value) {
      return false
    }

    const birtNumber = rodnecislo(value)

    return birtNumber.isValid()
  })
}

export const dateValidator = () => {
  return mixed().test("date", t("validator.date"), (val) => {
    if (!val) {
      return false
    }

    if (typeof val !== "string") {
      return DateTime.fromSeconds(val).isValid
    }

    return DateTime.fromFormat(val, dateFormat).isValid
  })
}

export const dateTimeValidator = () => {
  return mixed().test("datetime", t("validator.datetime"), (val) => {
    if (!val) {
      return false
    }

    if (typeof val !== "string") {
      return DateTime.fromSeconds(val).isValid
    }

    return DateTime.fromFormat(val, dateTimeFormat).isValid
  })
}

export const timeValidator = () => {
  return mixed().test("time", t("validator.time"), (val) => {
    if (!val || typeof val !== "string") {
      return false
    }
    return DateTime.fromFormat(val, timeFormat).isValid
  })
}

export const numberValidator = () => {
  return number()
}

export const moneyValidator = () => {
  return number().min(0)
}

export const firstNameValidator = () => {
  return string().label(t("name.firstName.label")).required()
}

export const lastNameValidator = () => {
  return string().label(t("name.lastName.label")).required()
}

export const phoneValidator = () => {
  return mixed()
    .test("phone", t("validator.phone"), (val, context) => {
      if (!val || `${val}`.length < 5) {
        return false
      }

      // todo better solution
      const prefix = context.parent.prefixPhone

      let country: CountryCode
      switch (prefix) {
        case "421":
          country = "SK"
          break
        case "420":
        default:
          country = "CZ"
      }

      const phoneNumber = parsePhoneNumber(context.parent.prefixPhone + val.toString(), country)

      return phoneNumber.isValid()
    })
    .label(t("mask.phone.label"))
    .required()
}

export const streetValidator = () => {
  return string().label(t("address.street.label")).required()
}

export const cityValidator = () => {
  return string().label(t("address.city.label")).required()
}

export const zipCodeValidator = () => {
  return mixed()
    .test("zip", t("validator.zip"), (val) => {
      if (!val) {
        return false
      }

      return /^\d{5}$/.test(convertToString(val))
    })
    .label(t("address.zip.label"))
    .required()
}

export const prefixPhoneValidator = () => {
  return string().label(t("address.prefix.label")).required()
}

export const emailValidator = () => {
  return string().label(t("address.email.label")).email()
}

export const icValidator = () => {
  return string().test("ic", t("validator.ic"), (value?: string) => {
    if (!value) {
      return false
    }

    return validateIc(value)
  })
}
