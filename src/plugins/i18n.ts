import { createI18n, useI18n } from "vue-i18n"
import { cs as vuetifyCs } from "vuetify/locale"
import cs from "../locales/cs"

const messages = {
  cs: {
    ...cs,
    $vuetify: vuetifyCs,
  },
}

export const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: "cs",
  fallbackLocale: "cs",
  messages,
  globalInjection: false,
})

export const tSubKey = (...args: string[]) => {
  return (key: string) => {
    const { t } = useI18n()

    return t(`${args.join(".")}.${key}`)
  }
}

export const tStepClientIdentification = tSubKey("stepClientIdentification")
export const tStepEconomicActivities = tSubKey("stepEconomicActivities")
export const tStepRiskProfile = tSubKey("stepRiskProfile")
export const tStepRiskTradeInvestment = tSubKey("stepRiskTradeInvestment")
export const tStepControlRecord = tSubKey("stepControlRecord")
export const tStepEnforceControl = tSubKey("stepEnforceControl")
export const tStepControl = tSubKey("stepControl")
export const tValidator = tSubKey("validator")
