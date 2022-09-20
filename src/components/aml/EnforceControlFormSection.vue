<template>
  <template v-if="isBusinessRegularIncome">
    <v-file-input :multiple="true" name="annualReportFiles" :label="tStepEnforceControl('annualReport.label')" />
    <v-file-input
      :multiple="true"
      name="salaryConfirmationFiles"
      :label="tStepEnforceControl('salaryConfirmation.label')"
    />
  </template>
  <template v-if="isSavingsIrregularIncome">
    <v-file-input
      :multiple="true"
      name="incomeTaxReturnsFiles"
      :label="tStepEnforceControl('incomeTaxReturnsFiles.label')"
    />
    <v-file-input :multiple="true" name="bankStatementFiles" :label="tStepEnforceControl('bankStatement.label')" />
  </template>
  <template v-else-if="isLoanIrregularIncome">
    <v-file-input :multiple="true" name="loanContractFiles" :label="tStepEnforceControl('loanContract.label')" />
    <v-file-input :multiple="true" name="documentsToSecure" :label="tStepEnforceControl('documentsToSecure.label')" />
  </template>
  <template v-else-if="isDonationIrregularIncome">
    <v-file-input
      :multiple="true"
      name="donationContractFiles"
      :label="tStepEnforceControl('donationContract.label')"
    />
  </template>
  <template v-else-if="isHeritageIrregularIncome">
    <v-file-input
      :multiple="true"
      name="creditInstitutionConfirmationHeritageFiles"
      :label="tStepEnforceControl('creditInstitutionHeritageConfirmation.label')"
    />
    <v-file-input
      :multiple="true"
      name="heritagePaymentReceivedFiles"
      :label="tStepEnforceControl('heritagePaymentReceived.label')"
    />
  </template>
  <template v-else-if="isCompanySaleIrregularIncome">
    <v-file-input
      :multiple="true"
      name="companySaleContractFiles"
      :label="tStepEnforceControl('companySaleContract.label')"
    />
    <v-file-input
      :multiple="true"
      name="creditInstitutionConfirmationSaleFiles"
      :label="tStepEnforceControl('creditInstitutionSaleConfirmation.label')"
    />
  </template>
  <template v-else-if="isPropertySaleIrregularIncome">
    <v-file-input
      :multiple="true"
      name="propertySaleContractFiles"
      :label="tStepEnforceControl('propertySaleContract.label')"
    />
    <v-file-input :multiple="true" name="registerExtractFiles" :label="tStepEnforceControl('registerExtract.label')" />
  </template>
  <template v-else-if="isSecuritiesSaleIrregularIncome">
    <v-file-input
      :multiple="true"
      name="securitiesSaleContractFiles"
      :label="tStepEnforceControl('securitiesSaleContract.label')"
    />
    <v-file-input
      :multiple="true"
      name="shareholderCertificationFiles"
      :label="tStepEnforceControl('shareholderCertification.label')"
    />
  </template>
  <template v-else-if="isDividendsIrregularIncome">
    <v-file-input
      :multiple="true"
      name="auditedAnnualReportFiles"
      :label="tStepEnforceControl('auditedAnnualReport.label')"
    />
    <v-file-input
      :multiple="true"
      name="financialStatementFiles"
      :label="tStepEnforceControl('financialStatement.label')"
    />
    <v-file-input
      :multiple="true"
      name="decisionProfitPaymentFiles"
      :label="tStepEnforceControl('decisionProfitPayment.label')"
    />
  </template>
  <template v-else-if="isClaimSaleIrregularIncome">
    <v-file-input
      :multiple="true"
      name="contractClaimAssignment"
      :label="tStepEnforceControl('contractClaimAssignment.label')"
    />
    <v-file-input
      :multiple="true"
      name="proofOfClaimExistenceFiles"
      :label="tStepEnforceControl('proofOfClaimExistenceFiles.label')"
    />
  </template>
  <template v-else-if="isOtherIrregularIncome">
    <v-file-input :multiple="true" name="otherRelevantFiles" :label="tStepEnforceControl('otherRelevantFiles.label')" />
  </template>
  <v-file-input name="anyFiles" :multiple="true" :label="tStepEnforceControl('anyFiles.label')" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { tStepEnforceControl } from "../../plugins/i18n"

export default defineComponent({
  components: {},
  props: {
    isBusinessRegularIncome: {
      type: Boolean,
      default: false,
    },
    isSavingsIrregularIncome: {
      type: Boolean,
      default: false,
    },
    isLoanIrregularIncome: {
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
    isOtherIrregularIncome: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {
      tStepEnforceControl,
    }
  },
})
</script>
