<template>
  <money-input :label="tStepRiskTradeInvestment('paperBonds.label')" name="paperBonds" />
  <money-input :label="tStepRiskTradeInvestment('bookBonds.label')" name="bookBonds" />
  <money-input :label="tStepRiskTradeInvestment('collectiveInvestment.label')" name="collectiveInvestment" />
  <money-input :label="tStepRiskTradeInvestment('yearCollectiveInvestment.label')" name="yearCollectiveInvestment" />
  <money-input :label="tStepRiskTradeInvestment('yearOtherInvestment.label')" name="yearOtherInvestment" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MoneyInput from "../common/form/imask/MoneyInput.vue"
import { tStepRiskTradeInvestment } from "../../plugins/i18n"
import { moneyValidator } from "../../services/validator"

export type RiskProductTypes = {
  paperBonds: number
  bookBonds: number
  collectiveInvestment: number
  yearCollectiveInvestment: number
  yearOtherInvestment: number
}

export const initialValuesRiskProduct = (data?: RiskProductTypes): RiskProductTypes => {
  return {
    paperBonds: data?.paperBonds || 123456,
    bookBonds: 0,
    collectiveInvestment: 0,
    yearCollectiveInvestment: 0,
    yearOtherInvestment: 0,
  }
}

export const useValidationSchemaRiskProduct = () => {
  return {
    paperBonds: moneyValidator().label(tStepRiskTradeInvestment("paperBonds.name")),
    bookBonds: moneyValidator().label(tStepRiskTradeInvestment("bookBonds.name")),
    collectiveInvestment: moneyValidator().label(tStepRiskTradeInvestment("collectiveInvestment.name")),
    yearCollectiveInvestment: moneyValidator().label(tStepRiskTradeInvestment("yearCollectiveInvestment.name")),
    yearOtherInvestment: moneyValidator().label(tStepRiskTradeInvestment("yearOtherInvestment.name")),
  }
}
export default defineComponent({
  components: {
    MoneyInput,
  },
  setup() {
    return {
      tStepRiskTradeInvestment,
    }
  },
})
</script>
