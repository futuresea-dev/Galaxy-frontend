<template>
  <select-input :label="tStepControlRecord('amountOfRegular.label')" name="amountIncome" :items="amountIncomeList" />
  <select-input :label="tStepControlRecord('resourceRegular.label')" name="resourceRegular" :items="resourceRegular" />
  <template v-if="isBusinessRegularIncome">
    <text-input :label="tStepControlRecord('detailedInformationBusiness.label')" name="detailedInformationBusiness" />
    <text-input :label="tStepControlRecord('businessActivity.label')" name="businessActivity" />
  </template>

  <money-input
    v-if="isOtherRegularIncome"
    :label="tStepControlRecord('otherRegularIncome.label')"
    name="otherRegularIncome"
  />

  <money-input :label="tStepControlRecord('amountOfIrregular.label')" name="amountOfIrregular" />
  <select-input
    :label="tStepControlRecord('resourceIrregular.label')"
    name="resourceIrregular"
    :items="resourceIrregular"
  />

  <template v-if="isSavingsIrregularIncome">
    <text-input :label="tStepControlRecord('incomesInPast.label')" name="incomesInPast" />
    <text-input :label="tStepControlRecord('jobInfo.label')" name="jobInfo" />
    <text-input :label="tStepControlRecord('savingsPeriodRealization.label')" name="savingsPeriodRealization" />
  </template>

  <template v-else-if="isSaleIrregularIncome">
    <text-input :label="tStepControlRecord('saleIrregularIncome.label')" name="saleIrregularIncome" />
  </template>

  <template v-else-if="isDonationIrregularIncome">
    <money-input :label="tStepControlRecord('donationAmount.label')" name="donationAmount" />
    <text-input :label="tStepControlRecord('donor.label')" name="donor" />
    <text-input :label="tStepControlRecord('giftedDonorRelationship.label')" name="giftedDonorRelationship" />
    <text-input :label="tStepControlRecord('sourceOfDonation.label')" name="sourceOfDonation" />
  </template>

  <template v-else-if="isHeritageIrregularIncome">
    <text-input :label="tStepControlRecord('testatorIdentity.label')" name="testatorIdentity" />
    <text-input :label="tStepControlRecord('heirTestatorRelationship.label')" name="heirTestatorRelationship" />
    <date-input :label="tStepControlRecord('inheritanceAcceptanceDate.label')" name="inheritanceAcceptanceDate" />
    <money-input :label="tStepControlRecord('inheritanceAmount.label')" name="inheritanceAmount" />
  </template>

  <template v-else-if="isCompanySaleIrregularIncome">
    <text-input :label="tStepControlRecord('soldCompanyIdentity.label')" name="soldCompanyIdentity" />
    <text-input :label="tStepControlRecord('businessShare.label')" name="businessShare" />
    <money-input :label="tStepControlRecord('companySalePrice.label')" name="companySalePrice" />
    <date-input :label="tStepControlRecord('companySaleDate.label')" name="companySaleDate" />
  </template>

  <template v-else-if="isPropertySaleIrregularIncome">
    <text-input :label="tStepControlRecord('propertyIdentity.label')" name="propertyIdentity" />
    <money-input :label="tStepControlRecord('propertySalePrice.label')" name="propertySalePrice" />
    <text-input :label="tStepControlRecord('propertySaleForm.label')" name="propertySaleForm" />
    <text-input :label="tStepControlRecord('propertyOwnershipLength.label')" name="propertyOwnershipLength" />
    <date-input :label="tStepControlRecord('propertySaleDate.label')" name="propertySaleDate" />
  </template>

  <template v-else-if="isSecuritiesSaleIrregularIncome">
    <text-input :label="tStepControlRecord('securitiesForm.label')" name="securitiesForm" />
    <money-input :label="tStepControlRecord('securitiesValue.label')" name="securitiesValue" />
    <text-input :label="tStepControlRecord('securitiesSaleForm.label')" name="securitiesSaleForm" />
    <date-input :label="tStepControlRecord('securitiesSaleDate.label')" name="securitiesSaleDate" />
    <text-input :label="tStepControlRecord('lengthInvestmentInformation.label')" name="lengthInvestmentInformation" />
  </template>

  <template v-else-if="isDividendsIrregularIncome">
    <text-input :label="tStepControlRecord('dividendPayerIdentification.label')" name="dividendPayerIdentification" />
  </template>

  <template v-else-if="isClaimSaleIrregularIncome">
    <money-input :label="tStepControlRecord('paymentAmountForClaim.label')" name="paymentAmountForClaim" />
    <money-input :label="tStepControlRecord('claimValue.label')" name="claimValue" />
    <text-input :label="tStepControlRecord('assigneeIdentity.label')" name="assigneeIdentity" />
    <text-input :label="tStepControlRecord('clientAssigneeRelationship.label')" name="clientAssigneeRelationship" />
    <date-input :label="tStepControlRecord('assignmentDate.label')" name="assignmentDate" />
  </template>

  <template v-else-if="isLoanIrregularIncome">
    <text-input :label="tStepControlRecord('loanAmount.label')" name="loanAmount" />
    <text-input :label="tStepControlRecord('creditorIdentity.label')" name="creditorIdentity" />
    <date-input :label="tStepControlRecord('loanDate.label')" name="loanDate" />
    <text-input :label="tStepControlRecord('loanMaturity.label')" name="loanMaturity" />
  </template>

  <template v-else-if="isOtherIrregularIncome">
    <text-input :label="tStepControlRecord('otherIrregularIncome.label')" name="otherIrregularIncome" />
    <text-input :label="tStepControlRecord('otherIncomeSource.label')" name="otherIncomeSource" />
    <date-input :label="tStepControlRecord('otherIncomeDate.label')" name="otherIncomeDate" />
  </template>

  <v-textarea
    :label="tStepControlRecord('additionalInformation.label')"
    name="additionalInformation"
    :auto-grow="true"
  />
  <text-input v-if="isPep" :label="tStepControlRecord('pepSourceOfMoney.label')" name="pepSourceOfMoney" />
  <text-input :label="tStepControlRecord('purposeOfTrade.label')" name="purposeOfTrade" />
  <radio-input
    name="isRefusedInspections"
    label="isRefusedInspections"
    :items="yesOrNoList"
    title="stepControl.refusedInspections.label"
  />

  <radio-input
    name="isDoubtsInformation"
    label="isDoubtsInformation"
    :items="yesOrNoList"
    title="stepControl.doubtsInformation.label"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { tStepControl, tStepControlRecord, tValidator } from "../../plugins/i18n"
import MoneyInput from "../common/form/imask/MoneyInput.vue"
import { moneyValidator } from "../../services/validator"
import SelectInput from "../common/form/SelectInput.vue"
import RadioInput from "../common/form/RadioInput.vue"
import DateInput from "../common/form/imask/DateInput.vue"
import TextInput from "../common/form/TextInput.vue"
import { date, string } from "yup"
import { useI18n } from "vue-i18n"
import { AmountIncomeOption, ResourceIrregularOption, ResourceRegularOption } from "./StepControlType"
import { useYesOrNoList, YesOrNo } from "../helpers/yesOrNo"
import { DateTime } from "luxon"

export default defineComponent({
  components: {
    MoneyInput,
    SelectInput,
    RadioInput,
    DateInput,
    TextInput,
  },
  props: {
    isPep: {
      type: Boolean,
      default: false,
    },
    isCheckSuspiciousBusiness: {
      type: Boolean,
      default: false,
    },
    isSavingsIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isSaleIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isDonationIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isHeritageIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isCompanySaleIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isPropertySaleIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isSecuritiesSaleIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isDividendsIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isClaimSaleIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isLoanIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isOtherIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isBusinessRegularIncome: {
      type: Boolean,
      default: false,
    },
    isOtherRegularIncome: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { t } = useI18n()
    const yesOrNoList = useYesOrNoList()

    const amountIncomeList = ref<Array<{ title: string; value: string }>>([
      { title: t("stepControl.amountRegularIncomeNone.label"), value: "none" },
      { title: t("stepControl.amountRegularIncomeLess20k.label"), value: "less20k" },
      { title: t("stepControl.amountRegularIncomeLess40k.label"), value: "less40k" },
      { title: t("stepControl.amountRegularIncomeLess60k.label"), value: "less60k" },
      { title: t("stepControl.amountRegularIncomeLess100k.label"), value: "less100k" },
      { title: t("stepControl.amountRegularIncomeMore100k.label"), value: "more100k" },
    ])

    const resourceRegular = ref<Array<{ title: string; value: string }>>([
      { title: t("stepControl.regularIncomeEmployee.label"), value: "employee" },
      { title: t("stepControl.regularIncomeBusiness.label"), value: "business" },
      { title: t("stepControl.regularIncomeEmployeeAndBusiness.label"), value: "employeeBusiness" },
      { title: t("stepControl.regularIncomeLease.label"), value: "lease" },
      { title: t("stepControl.regularIncomeSocialBenefits.label"), value: "social" },
      { title: t("stepControl.regularIncomeSocialBenefitsAndEmployee.label"), value: "socialEmployee" },
      { title: t("stepControl.regularIncomeSocialBenefitsAndBusiness.label"), value: "socialBusiness" },
      { title: t("stepControl.regularIncomeOther.label"), value: "other" },
    ])

    const resourceIrregular = ref<Array<{ title: string; value: string }>>([
      { title: t("stepControl.irregularIncomeNone.label"), value: "none" },
      { title: t("stepControl.irregularIncomeSavings.label"), value: "savings" },
      { title: t("stepControl.irregularIncomeSale.label"), value: "sale" },
      { title: t("stepControl.irregularIncomeDonation.label"), value: "donation" },
      { title: t("stepControl.irregularIncomeHeritage.label"), value: "heritage" },
      { title: t("stepControl.irregularIncomeCompanySale.label"), value: "companySale" },
      { title: t("stepControl.irregularIncomePropertySale.label"), value: "propertySale" },
      { title: t("stepControl.irregularIncomeSecuritiesSale.label"), value: "securitiesSale" },
      { title: t("stepControl.irregularIncomeDividends.label"), value: "dividends" },
      { title: t("stepControl.irregularIncomeClaimSale.label"), value: "claimSale" },
      { title: t("stepControl.irregularIncomeLottery.label"), value: "lottery" },
      { title: t("stepControl.irregularIncomeLoan.label"), value: "loan" },
      { title: t("stepControl.irregularIncomeOther.label"), value: "other" },
    ])

    return {
      tStepControlRecord,
      amountIncomeList,
      resourceRegular,
      resourceIrregular,
      yesOrNoList,
    }
  },
})

export type ControlRecordTypes = {
  amountIncome: AmountIncomeOption
  resourceRegular: ResourceRegularOption
  resourceIrregular: ResourceIrregularOption
  incomesInPast?: string
  jobInfo?: string
  savingsPeriod?: string
  saleIrregularIncome?: string
  donationAmount?: number
  donor?: string
  giftedDonorRelationship?: string
  sourceOfDonation?: string
  testatorIdentity?: string
  heirTestatorRelationship?: string
  inheritanceAcceptanceDate?: string
  inheritanceAmount?: number
  soldCompanyIdentity?: string
  businessShare?: string
  companySalePrice?: number
  companySaleDate?: string
  propertyIdentity?: string
  propertySalePrice?: number
  propertySaleForm?: string
  propertyOwnershipLength?: string
  propertySaleDate?: string
  securitiesForm?: string
  securitiesValue?: number
  securitiesSaleForm?: string
  securitiesSaleDate?: string
  lengthInvestmentInformation?: string
  dividendPayerIdentification?: string
  paymentAmountForClaim?: number
  claimValue?: number
  assigneeIdentity?: string
  clientAssigneeRelationship?: string
  assignmentDate?: string
  loanAmount?: string
  creditorIdentity?: string
  loanDate?: string
  loanMaturity?: string
  otherIrregularIncome?: string
  otherIncomeSource?: string
  otherIncomeDate?: string
  additionalInformation: string
  isRefusedInspections: YesOrNo
  isDoubtsInformation: YesOrNo
}

export const initialValuesControlRecord = (data?: ControlRecordTypes): ControlRecordTypes => {
  return {
    amountIncome: data?.amountIncome ?? "less40k",
    resourceRegular: "employee",
    resourceIrregular: "none",
    incomesInPast: undefined,
    jobInfo: undefined,
    savingsPeriod: undefined,
    saleIrregularIncome: undefined,
    donationAmount: undefined,
    donor: undefined,
    giftedDonorRelationship: undefined,
    sourceOfDonation: undefined,
    testatorIdentity: undefined,
    heirTestatorRelationship: undefined,
    inheritanceAcceptanceDate: undefined,
    inheritanceAmount: undefined,
    soldCompanyIdentity: undefined,
    businessShare: undefined,
    companySalePrice: undefined,
    companySaleDate: undefined,
    propertyIdentity: undefined,
    propertySalePrice: undefined,
    propertySaleForm: undefined,
    propertyOwnershipLength: undefined,
    propertySaleDate: undefined,
    securitiesForm: undefined,
    securitiesValue: undefined,
    securitiesSaleForm: undefined,
    securitiesSaleDate: undefined,
    lengthInvestmentInformation: undefined,
    dividendPayerIdentification: undefined,
    paymentAmountForClaim: undefined,
    claimValue: undefined,
    assigneeIdentity: undefined,
    clientAssigneeRelationship: undefined,
    assignmentDate: undefined,
    loanAmount: undefined,
    creditorIdentity: undefined,
    loanDate: undefined,
    loanMaturity: undefined,
    otherIrregularIncome: undefined,
    otherIncomeSource: undefined,
    otherIncomeDate: undefined,
    additionalInformation: "",
    isRefusedInspections: "no",
    isDoubtsInformation: "no",
  }
}

export const useValidationSchemaControlRecord = () => {
  return {
    amountIncome: string().required().label(tStepControlRecord("amountOfRegular.name")),
    resourceRegular: string().required().label(tStepControlRecord("resourceRegular.name")),
    otherRegularIncome: string().when("resourceRegular", {
      is: "other",
      then: (schema) => schema.required().label(tStepControlRecord("otherRegularIncome.name")),
    }),
    detailedInformationBusiness: string().when("resourceRegular", {
      is: "business",
      then: (schema) => schema.required().label(tStepControlRecord("detailedInformationBusiness.name")),
    }),
    businessActivity: string().when("resourceRegular", {
      is: "business",
      then: (schema) => schema.required().label(tStepControlRecord("businessActivity.name")),
    }),
    amountOfIrregular: moneyValidator().label(tStepControlRecord("amountOfIrregular.name")),
    resourceIrregular: string().required().label(tStepControlRecord("resourceIrregular.name")),
    // Conditional validation for inputs toggled by select with name "resourceIrregular"
    incomesInPast: string().when("resourceIrregular", {
      is: "savings",
      then: (schema) => schema.required().label(tStepControlRecord("incomesInPast.name")),
    }),
    jobInfo: string().when("resourceIrregular", {
      is: "savings",
      then: (schema) => schema.required().label(tStepControlRecord("jobInfo.name")),
    }),
    savingsPeriodRealization: string().when("resourceIrregular", {
      is: "savings",
      then: (schema) => schema.required().label(tStepControlRecord("savingsPeriodRealization.name")),
    }),
    saleIrregularIncome: string().when("resourceIrregular", {
      is: "sale",
      then: (schema) => schema.required().label(tStepControlRecord("saleIrregularIncome.name")),
    }),
    donationAmount: moneyValidator().when("resourceIrregular", {
      is: "donation",
      then: (schema) => schema.required().label(tStepControlRecord("donationAmount.name")),
    }),
    donor: string().when("resourceIrregular", {
      is: "donation",
      then: (schema) => schema.required().label(tStepControlRecord("donor.name")),
    }),
    giftedDonorRelationship: string().when("resourceIrregular", {
      is: "donation",
      then: (schema) => schema.required().label(tStepControlRecord("giftedDonorRelationship.name")),
    }),
    sourceOfDonation: string().when("resourceIrregular", {
      is: "donation",
      then: (schema) => schema.required().label(tStepControlRecord("sourceOfDonation.name")),
    }),
    testatorIdentity: string().when("resourceIrregular", {
      is: "heritage",
      then: (schema) => schema.required().label(tStepControlRecord("testatorIdentity.name")),
    }),
    heirTestatorRelationship: string().when("resourceIrregular", {
      is: "heritage",
      then: (schema) => schema.required().label(tStepControlRecord("heirTestatorRelationship.name")),
    }),
    inheritanceAcceptanceDate: date().when("resourceIrregular", {
      is: "heritage",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("inheritanceAcceptanceDate.name")),
    }),
    inheritanceAmount: moneyValidator().when("resourceIrregular", {
      is: "heritage",
      then: (schema) => schema.required().label(tStepControlRecord("inheritanceAmount.name")),
    }),
    soldCompanyIdentity: string().when("resourceIrregular", {
      is: "companySale",
      then: (schema) => schema.required().label(tStepControlRecord("soldCompanyIdentity.name")),
    }),
    businessShare: string().when("resourceIrregular", {
      is: "companySale",
      then: (schema) => schema.required().label(tStepControlRecord("businessShare.name")),
    }),
    companySalePrice: moneyValidator().when("resourceIrregular", {
      is: "companySale",
      then: (schema) => schema.required().label(tStepControlRecord("companySalePrice.name")),
    }),
    companySaleDate: date().when("resourceIrregular", {
      is: "companySale",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("companySaleDate.name")),
    }),
    propertyIdentity: string().when("resourceIrregular", {
      is: "propertySale",
      then: (schema) => schema.required().label(tStepControlRecord("propertyIdentity.name")),
    }),
    propertySalePrice: moneyValidator().when("resourceIrregular", {
      is: "propertySale",
      then: (schema) => schema.required().label(tStepControlRecord("propertySalePrice.name")),
    }),
    propertySaleForm: string().when("resourceIrregular", {
      is: "propertySale",
      then: (schema) => schema.required().label(tStepControlRecord("propertySaleForm.name")),
    }),
    propertyOwnershipLength: string().when("resourceIrregular", {
      is: "propertySale",
      then: (schema) => schema.required().label(tStepControlRecord("propertyOwnershipLength.name")),
    }),
    propertySaleDate: date().when("resourceIrregular", {
      is: "propertySale",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("propertySaleDate.name")),
    }),
    securitiesForm: string().when("resourceIrregular", {
      is: "securitiesSale",
      then: (schema) => schema.required().label(tStepControlRecord("securitiesForm.name")),
    }),
    securitiesValue: moneyValidator().when("resourceIrregular", {
      is: "securitiesSale",
      then: (schema) => schema.required().label(tStepControlRecord("securitiesValue.name")),
    }),
    securitiesSaleForm: string().when("resourceIrregular", {
      is: "securitiesSale",
      then: (schema) => schema.required().label(tStepControlRecord("securitiesSaleForm.name")),
    }),
    securitiesSaleDate: date().when("resourceIrregular", {
      is: "securitiesSale",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("securitiesSaleDate.name")),
    }),
    lengthInvestmentInformation: string().when("resourceIrregular", {
      is: "securitiesSale",
      then: (schema) => schema.required().label(tStepControlRecord("lengthInvestmentInformation.name")),
    }),
    dividendPayerIdentification: string().when("resourceIrregular", {
      is: "dividends",
      then: (schema) => schema.required().label(tStepControlRecord("dividendPayerIdentification.name")),
    }),
    paymentAmountForClaim: moneyValidator().when("resourceIrregular", {
      is: "claimSale",
      then: (schema) => schema.required().label(tStepControlRecord("paymentAmountForClaim.name")),
    }),
    claimValue: moneyValidator().when("resourceIrregular", {
      is: "claimSale",
      then: (schema) => schema.required().label(tStepControlRecord("claimValue.name")),
    }),
    assigneeIdentity: string().when("resourceIrregular", {
      is: "claimSale",
      then: (schema) => schema.required().label(tStepControlRecord("assigneeIdentity.name")),
    }),
    clientAssigneeRelationship: string().when("resourceIrregular", {
      is: "claimSale",
      then: (schema) => schema.required().label(tStepControlRecord("clientAssigneeRelationship.name")),
    }),
    assignmentDate: date().when("resourceIrregular", {
      is: "claimSale",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("assignmentDate.name")),
    }),
    loanAmount: string().when("resourceIrregular", {
      is: "loan",
      then: (schema) => schema.required().label(tStepControlRecord("loanAmount.name")),
    }),
    loanDate: date().when("resourceIrregular", {
      is: "loan",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("loanDate.name")),
    }),
    creditorIdentity: string().when("resourceIrregular", {
      is: "loan",
      then: (schema) => schema.required().label(tStepControlRecord("loanAmount.name")),
    }),
    loanMaturity: string().when("resourceIrregular", {
      is: "loan",
      then: (schema) => schema.required().label(tStepControlRecord("loanMaturity.name")),
    }),
    otherIrregularIncome: string().when("resourceIrregular", {
      is: "other",
      then: (schema) => schema.required().label(tStepControlRecord("otherIrregularIncome.name")),
    }),
    otherIncomeSource: string().when("resourceIrregular", {
      is: "other",
      then: (schema) => schema.required().label(tStepControlRecord("otherIncomeSource.name")),
    }),
    otherIncomeDate: date().when("resourceIrregular", {
      is: "other",
      then: (schema) =>
        schema
          .typeError(tValidator("date"))
          .max(DateTime.now().toJSDate())
          .required()
          .label(tStepControlRecord("otherIncomeDate.name")),
    }),
    purposeOfTrade: string().required().label(tStepControlRecord("purposeOfTrade.name")),
    isRefusedInspections: string().required().label(tStepControl("refusedInspections.name")),
    isDoubtsInformation: string().required().label(tStepControl("doubtsInformation.name")),
  }
}
</script>
