import { setLocale } from "yup"
import { LocaleObject } from "yup/lib/locale"
import { DateTime } from "luxon"

const cs: LocaleObject = {
  mixed: {
    default: 'Hodnota v "${path}" je neplatná',
    required: 'Pole "${path}" je povinné',
    oneOf: "${path} musí obsahovat jednu z následujících hodnot: ${values}",
    notOneOf: "${path} nesmí obsahovat žádnou z následujících hodnot: ${values}",
  },
  string: {
    length: "${path} musí obsahovat přesně ${length} znaků",
    min: "${path} musí obsahovat minimálně ${min} znaků",
    max: "${path} musí obsahovat maximálně ${max} znaků",
    matches: '${path} musí splňovat pravidlo: "${regex}"',
    email: "${path} musí být platná emailová adresa",
    url: "${path} musí být platná URL adresa",
    trim: "${path} nesmí obsahovat mezery",
    lowercase: "${path} musí obsahovat jen malá písmena",
    uppercase: "${path} musí obsahovat jen velká písmena",
  },
  number: {
    min: "${path} musí být větší nebo rovno ${min}",
    max: "${path} musí být menší nebo rovno ${max}",
    lessThan: "${path} musí být menší než ${less}",
    moreThan: "${path} musí být větší než ${more}",
    positive: "${path} musí být kladné číslo",
    negative: "${path} musí být záporné číslo",
    integer: "${path} musí být celé číslo",
  },
  date: {
    min: ({ path, min }) => {
      const dt = DateTime.fromJSDate(min as Date)
      return `${path} musí být po ${dt.toLocaleString(DateTime.DATE_SHORT)}`
    },
    max: ({ path, max }) => {
      const dt = DateTime.fromJSDate(max as Date)
      return `${path} musí být před ${dt.toLocaleString(DateTime.DATE_SHORT)}`
    },
  },
  boolean: {},
  object: {
    noUnknown: "${path}-pole nesmí obsahovat nespecifikované klíče",
  },
  array: {
    min: "${path}-pole musí obsahovat alespoň ${min} položky",
    max: "${path}-pole musí obsahova maximálně ${max} položky",
  },
}

setLocale(cs)
