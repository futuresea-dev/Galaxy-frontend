<template>
  <radio-input name="isPep" label="isPep" :items="yesOrNoList" title="stepRiskProfile.pep.label" />

  <radio-input name="isFatf" label="isFatf" :items="yesOrNoList" title="stepRiskProfile.fatf.label" />

  <radio-input
    name="isOfficeAddress"
    label="isOfficeAddress"
    :items="yesOrNoList"
    title="stepRiskProfile.officeAddress.label"
  />

  <radio-input
    name="riskProfession"
    label="riskProfession"
    :items="yesOrNoList"
    title="stepRiskProfile.riskProfession.label"
  />

  <radio-input name="isSuspicion" label="isSuspicion" :items="yesOrNoList" title="stepRiskProfile.suspicion.label" />

  <radio-input name="isCash" label="isCash" :items="yesOrNoList" title="stepRiskProfile.cash.label" />

  <radio-input name="isCrime" label="isCrime" :items="yesOrNoList" title="stepRiskProfile.crime.label" />

  <radio-input
    name="isNegativeInformation"
    label="isNegativeInformation"
    :items="yesOrNoList"
    title="stepRiskProfile.negativeInformation.label"
  />

  <radio-input
    name="isSuspiciousBusiness"
    label="isSuspiciousBusiness"
    :items="yesOrNoList"
    title="stepRiskProfile.suspiciousBusiness.label"
  />

  <select-input
    v-if="isCheckSuspiciousBusiness"
    :label="tStepRiskProfile('suspiciousMark.label')"
    name="suspiciousSelect"
    :items="suspicious"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { tStepRiskProfile } from "../../plugins/i18n"
import { useYesOrNoList, YesOrNo } from "../helpers/yesOrNo"
import RadioInput from "../common/form/RadioInput.vue"
import SelectInput from "../common/form/SelectInput.vue"
import { string } from "yup"

export type RiskProfileTypes = {
  isPep: YesOrNo
  isFatf: YesOrNo
  isOfficeAddress: YesOrNo
  riskProfession: YesOrNo
  isSuspicion: YesOrNo
  isCash: YesOrNo
  isCrime: YesOrNo
  isNegativeInformation: YesOrNo
  isSuspiciousBusiness: YesOrNo
  suspiciousSelect?: SuspiciousOption
}

export const initialValuesRiskProfile = (data?: RiskProfileTypes): RiskProfileTypes => {
  return {
    isPep: "no",
    isFatf: "no",
    isOfficeAddress: data?.isOfficeAddress || "no",
    riskProfession: "no",
    isSuspicion: "no",
    isCash: "no",
    isCrime: "no",
    isNegativeInformation: "no",
    isSuspiciousBusiness: "no",
    suspiciousSelect: undefined,
  }
}

export const useValidationSchemaRiskProfile = () => {
  return {
    isFatf: string().required().label(tStepRiskProfile("fatf.name")),
    isOfficeAddress: string().required().label(tStepRiskProfile("officeAddress.name")),
    riskProfession: string().required().label(tStepRiskProfile("riskProfession.name")),
    isSuspicion: string().required().label(tStepRiskProfile("suspicion.name")),
    isCash: string().required().label(tStepRiskProfile("cash.name")),
    isCrime: string().required().label(tStepRiskProfile("crime.name")),
    isNegativeInformation: string().required().label(tStepRiskProfile("negativeInformation.name")),
    isSuspiciousBusiness: string().required().label(tStepRiskProfile("suspiciousBusiness.name")),
  }
}

export default defineComponent({
  components: {
    SelectInput,
    RadioInput,
  },
  props: {
    isCheckSuspiciousBusiness: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const suspicious = ref<Array<{ title: string; value: string }>>([
      {
        title: tStepRiskProfile("sanctionSubject.label"),
        value: "fatf",
      },
      {
        title: tStepRiskProfile("untrustworthyData.label"),
        value: "untrust",
      },
      {
        title: tStepRiskProfile("excessiveBusinessAmount.label"),
        value: "excessive",
      },
      {
        title: tStepRiskProfile("repeatedlyEstablishmentAnnulment.label"),
        value: "repeatedly",
      },
      {
        title: tStepRiskProfile("documentDubiety.label"),
        value: "document",
      },
      {
        title: tStepRiskProfile("unusualOffer.label"),
        value: "unusual",
      },
      {
        title: tStepRiskProfile("illogicalMoneyTransaction.label"),
        value: "illogical",
      },
      {
        title: tStepRiskProfile("unknownReasonForTransaction.label"),
        value: "unknown",
      },
      {
        title: tStepRiskProfile("transactionOutOfCustomers.label"),
        value: "transaction",
      },
      {
        title: tStepRiskProfile("atypicalTransaction.label"),
        value: "atypicalTransaction",
      },
      {
        title: tStepRiskProfile("nervousClient.label"),
        value: "nervous",
      },
      {
        title: tStepRiskProfile("trackedClient.label"),
        value: "tracked",
      },
      {
        title: tStepRiskProfile("middlemanClient.label"),
        value: "middleman",
      },
      {
        title: tStepRiskProfile("atypicalWayOfTransferingMoney.label"),
        value: "atypical",
      },
      {
        title: tStepRiskProfile("effortForMinimalContact.label"),
        value: "effort",
      },
      {
        title: tStepRiskProfile("taxParadise.label"),
        value: "tax",
      },
      {
        title: tStepRiskProfile("digitalCurrency.label"),
        value: "digital",
      },
      {
        title: tStepRiskProfile("middlemanClientOrTracked.label"),
        value: "middlemanClient",
      },
      {
        title: tStepRiskProfile("hidingIdentity.label"),
        value: "hiding",
      },
      {
        title: tStepRiskProfile("unwillinglyIdentified.label"),
        value: "unwillingly",
      },
      {
        title: tStepRiskProfile("crimeHistory.label"),
        value: "crime",
      },
      {
        title: tStepRiskProfile("connectionToRiskCountry.label"),
        value: "connection",
      },
      {
        title: tStepRiskProfile("atypicalWayOfTransferingMoney.label"),
        value: "atypical",
      },
      {
        title: tStepRiskProfile("propertyUnknownSource.label"),
        value: "property",
      },
      {
        title: tStepRiskProfile("unknownCustomer.label"),
        value: "unknownCustomer",
      },
      {
        title: tStepRiskProfile("transactionBelowLimit.label"),
        value: "transactionBelow",
      },
      {
        title: tStepRiskProfile("suspicionMiddleman.label"),
        value: "suspiciousMiddleman",
      },
      {
        title: tStepRiskProfile("identificationProblem.label"),
        value: "identification",
      },
    ])

    return {
      yesOrNoList: useYesOrNoList(),
      tStepRiskProfile,
      suspicious,
    }
  },
})

type SuspiciousOption =
  | "fatf"
  | "untrust"
  | "excessive"
  | "repeatedly"
  | "document"
  | "unusual"
  | "illogical"
  | "unknown"
  | "transaction"
  | "atypicalTransaction"
  | "nervous"
  | "tracked"
  | "middleman"
  | "atypical"
  | "property"
  | "unknownCustomer"
  | "transactionBelow"
  | "suspiciousMiddleman"
  | "identification"
</script>
