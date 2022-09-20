<template>
  <form-page-layout hero-content="stepPersonalData.stepPersonalData.content" title="amlTitles.mainTitle">
    <form id="aml-form" @submit="onSubmit">
      <v-tabs :fixed-tabs="true" theme="dark" class="my-5">
        <v-tab> Fyzická osoba</v-tab>
        <v-tab> Fyzická osoba se zastoupením</v-tab>
      </v-tabs>
      <v-divider color="#gray-200" class="mb-7" />

      <form-section title="stepClientIdentification.title.text">
        <personal-data-form-section :is-foreigner="isForeigner" />
      </form-section>

      <form-section title="stepEconomicActivities.title.text">
        <economic-activities-form-section />
      </form-section>

      <form-section title="stepRiskProfile.title.text">
        <risk-profile-form-section :is-check-suspicious-business="isCheckSuspiciousBusiness" />
      </form-section>

      <form-section title="amlTitles.riskProduct">
        <risk-product-form-section />
      </form-section>

      <form-section title="amlTitles.recordControl">
        <control-record-form-section
          :is-pep="isPep"
          :is-check-suspicious-business="isCheckSuspiciousBusiness"
          :is-savings-irregular-income="isSavingsIrregularIncome"
          :is-sale-irregular-income="isSaleIrregularIncome"
          :is-donation-irregular-income="isDonationIrregularIncome"
          :is-heritage-irregular-income="isHeritageIrregularIncome"
          :is-company-sale-irregular-income="isCompanySaleIrregularIncome"
          :is-property-sale-irregular-income="isPropertySaleIrregularIncome"
          :is-securities-sale-irregular-income="isSecuritiesSaleIrregularIncome"
          :is-dividends-irregular-income="isDividendsIrregularIncome"
          :is-claim-sale-irregular-income="isClaimSaleIrregularIncome"
          :is-loan-irregular-income="isLoanIrregularIncome"
          :is-other-irregular-income="isOtherIrregularIncome"
          :is-business-regular-income="isBusinessRegularIncome"
          :is-other-regular-income="isOtherRegularIncome"
        />
      </form-section>

      <form-section title="amlTitles.enforceControl">
        <!-- Step with enforced control, toggling inputs based on selection of regular/irregular income (previous section) -->
        <enforce-control-form-section
          :is-business-regular-income="isBusinessRegularIncome"
          :is-savings-irregular-income="isSavingsIrregularIncome"
          :is-loan-irregular-income="isLoanIrregularIncome"
          :is-donation-irregular-income="isDonationIrregularIncome"
          :is-heritage-irregular-income="isHeritageIrregularIncome"
          :is-company-sale-irregular-income="isCompanySaleIrregularIncome"
          :is-property-sale-irregular-income="isCompanySaleIrregularIncome"
          :is-securities-sale-irregular-income="isSecuritiesSaleIrregularIncome"
          :is-dividends-irregular-income="isDividendsIrregularIncome"
          :is-claim-sale-irregular-income="isClaimSaleIrregularIncome"
          :is-other-irregular-income="isOtherIrregularIncome"
        />
      </form-section>
      <submit-primary-light label="TODO" />
    </form>
  </form-page-layout>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import { useForm } from "vee-validate"
import { object } from "yup"
import FormPageLayout from "../../components/layout/FormPageLayout.vue"
import FormSection from "../../components/layout/FormSection.vue"
import SubmitPrimaryLight from "../../components/common/button/SubmitPrimaryLight.vue"
import { useGenderList } from "../../components/helpers/gender"
import PersonalDataFormSection, {
  initialValuesPersonalData,
  PersonalDataTypes,
  useValidationSchemaPersonalData,
} from "../../components/aml/PersonalDataFormSection.vue"

import EconomicActivitiesFormSection, {
  initialValuesEconomicActivities,
  EconomicActivitiesTypes,
  useValidationSchemaEconomicActivities,
} from "../../components/aml/EconomicActivitiesFormSection.vue"

import RiskProfileFormSection, {
  initialValuesRiskProfile,
  RiskProfileTypes,
  useValidationSchemaRiskProfile,
} from "../../components/aml/RiskProfileFormSection.vue"

import RiskProductFormSection, {
  initialValuesRiskProduct,
  RiskProductTypes,
  useValidationSchemaRiskProduct,
} from "../../components/aml/RiskProductFormSection.vue"
import ControlRecordFormSection, {
  ControlRecordTypes,
  initialValuesControlRecord,
  useValidationSchemaControlRecord,
} from "../../components/aml/ControlRecordFormSection.vue"
import EnforceControlFormSection from "../../components/aml/EnforceControlFormSection.vue"

type AmlForm = PersonalDataTypes & EconomicActivitiesTypes & RiskProfileTypes & RiskProductTypes & ControlRecordTypes

export default defineComponent({
  components: {
    EnforceControlFormSection,
    ControlRecordFormSection,
    RiskProductFormSection,
    RiskProfileFormSection,
    PersonalDataFormSection,
    EconomicActivitiesFormSection,
    SubmitPrimaryLight,
    FormSection,
    FormPageLayout,
  },
  setup() {
    const { t } = useI18n()

    const { values, handleSubmit } = useForm<AmlForm>({
      initialValues: {
        ...initialValuesPersonalData(),
        ...initialValuesEconomicActivities(),
        ...initialValuesRiskProfile(),
        ...initialValuesRiskProduct(),
        ...initialValuesControlRecord(),
      },
      validationSchema: object({
        ...useValidationSchemaPersonalData(),
        ...useValidationSchemaEconomicActivities(),
        ...useValidationSchemaRiskProfile(),
        ...useValidationSchemaRiskProduct(),
        ...useValidationSchemaControlRecord(),
      }),
    })

    const onSubmit = handleSubmit((values) => {
      // eslint-disable-next-line
      console.log(values)
    })

    const gender = useGenderList()

    const isPep = computed(() => {
      return values.isPep === "yes"
    })

    const isCheckSuspiciousBusiness = computed(() => {
      return values.isSuspiciousBusiness === "yes"
    })

    const isSavingsIrregularIncome = computed(() => {
      return values.resourceIrregular === "savings"
    })

    const isSaleIrregularIncome = computed(() => {
      return values.resourceIrregular === "sale"
    })

    const isOtherRegularIncome = computed(() => {
      return values.resourceRegular === "other"
    })

    const isBusinessRegularIncome = computed(() => {
      return values.resourceRegular === "business"
    })

    const isDonationIrregularIncome = computed(() => {
      return values.resourceIrregular === "donation"
    })

    const isHeritageIrregularIncome = computed(() => {
      return values.resourceIrregular === "heritage"
    })

    const isCompanySaleIrregularIncome = computed(() => {
      return values.resourceIrregular === "companySale"
    })

    const isPropertySaleIrregularIncome = computed(() => {
      return values.resourceIrregular === "propertySale"
    })

    const isSecuritiesSaleIrregularIncome = computed(() => {
      return values.resourceIrregular === "securitiesSale"
    })

    const isDividendsIrregularIncome = computed(() => {
      return values.resourceIrregular === "dividends"
    })

    const isClaimSaleIrregularIncome = computed(() => {
      return values.resourceIrregular === "claimSale"
    })

    const isLoanIrregularIncome = computed(() => {
      return values.resourceIrregular === "loan"
    })

    const isOtherIrregularIncome = computed(() => {
      return values.resourceIrregular === "other"
    })

    const isForeigner = computed(() => {
      return values.foreigner === "yes"
    })

    return {
      t,
      gender,
      onSubmit,
      values,
      isPep,
      isCheckSuspiciousBusiness,
      isSavingsIrregularIncome,
      isSaleIrregularIncome,
      isDonationIrregularIncome,
      isHeritageIrregularIncome,
      isCompanySaleIrregularIncome,
      isPropertySaleIrregularIncome,
      isSecuritiesSaleIrregularIncome,
      isDividendsIrregularIncome,
      isClaimSaleIrregularIncome,
      isLoanIrregularIncome,
      isOtherIrregularIncome,
      isBusinessRegularIncome,
      isOtherRegularIncome,
      isForeigner,
    }
  },
})
</script>
