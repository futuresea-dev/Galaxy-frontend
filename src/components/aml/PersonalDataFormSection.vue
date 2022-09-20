<template>
  <first-name />
  <last-name />
  <select-input :label="tStepClientIdentification('clientIsForeigner.label')" name="foreigner" :items="yesOrNoList" />
  <birth-number-input
    v-if="isForeigner"
    :label="tStepClientIdentification('birthNumber.label')"
    name="birthNumber"
    return-type="int"
  />
  <date-input v-if="!isForeigner" :label="tStepClientIdentification('birthDate.label')" name="birthDate" />
  <select-input :label="tStepClientIdentification('gender.label')" name="gender" :items="genderList" />
  <text-input :label="tStepClientIdentification('birthPlace.label')" name="birthPlace" />
  <flag-autocomplete-input :label="tStepClientIdentification('countryOfOrigin.label')" name="countryOrigin" />
  <flag-autocomplete-input :label="tStepClientIdentification('otherCountryOfOrigin.label')" name="otherCountryOrigin" />
  <flag-autocomplete-input :label="tStepClientIdentification('placeOfResidence.label')" name="residence" />
  <flag-autocomplete-input :label="tStepClientIdentification('citizenShip.label')" name="citizen" />
  <flag-autocomplete-input :label="tStepClientIdentification('nextCitizenShip.label')" name="nextCitizen" />
  <street />
  <city />
  <zip-input />
  <select-input
    :label="tStepClientIdentification('identifyVerificationMethod.label')"
    name="verificationMethod"
    :items="verification"
  />
  <text-input :label="tStepClientIdentification('documentType.label')" name="documentType" />
  <date-input :label="tStepClientIdentification('documentValidity.label')" name="documentValidity" />
  <text-input :label="tStepClientIdentification('documentNumber.label')" name="documentNumber" />
  <text-input :label="tStepClientIdentification('issuerOfTheDocument.label')" name="issuerOfTheDocument" />
  <date-input :label="tStepClientIdentification('clientIdentificationDate.label')" name="clientIdentificationDate" />
  <radio-input
    name="refusedIdentification"
    label="refusedIdentification"
    :items="yesOrNoList"
    title="stepClientIdentification.refuseIdentification.label"
  />
  <radio-input
    name="doubtValidity"
    label="doubtValidity"
    :items="yesOrNoList"
    title="stepClientIdentification.doubtValidity.label"
  />
  <radio-input
    name="sanctionList"
    label="sanctionList"
    :items="yesOrNoList"
    title="stepClientIdentification.sanctionList.label"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import FlagAutocompleteInput from "../common/form/FlagAutocompleteInput.vue"
import SelectInput from "../common/form/SelectInput.vue"
import RadioInput from "../common/form/RadioInput.vue"
import DateInput from "../common/form/imask/DateInput.vue"
import Street from "../common/form/Street.vue"
import TextInput from "../common/form/TextInput.vue"
import BirthNumberInput from "../common/form/imask/BirthNumberInput.vue"
import FirstName from "../common/form/FirstName.vue"
import LastName from "../common/form/LastName.vue"
import City from "../common/form/City.vue"
import ZipInput from "../common/form/imask/ZipInput.vue"
import {
  CityInputType,
  FirstNameInputType,
  LastNameInputType,
  StreetInputType,
  ZipInputType,
} from "../common/form/InputTypes"
import { Country } from "./country"
import { useYesOrNoList, YesOrNo } from "../helpers/yesOrNo"
import { Gender, useGenderList } from "../helpers/gender"
import { DateTime } from "luxon"
import { dateFormat } from "../../plugins/imask"
import {
  birthNumberValidator,
  cityValidator,
  firstNameValidator,
  lastNameValidator,
  streetValidator,
  zipCodeValidator,
} from "../../services/validator"
import { date, string } from "yup"
import { tStepClientIdentification, tValidator } from "../../plugins/i18n"

export type PersonalDataTypes = {
  foreigner: YesOrNo
  birthNumber: string
  gender: Gender
  birthPlace: string
  birthDate: string
  countryOrigin: Country
  otherCountryOrigin: Country
  residence: Country
  citizen: Country
  nextCitizen: Country
  verificationMethod: string
  documentType: string
  documentValidity: string
  documentNumber: string
  issuerOfTheDocument: string
  clientIdentificationDate: string
  refusedIdentification: YesOrNo
  doubtValidity: YesOrNo
  sanctionList: YesOrNo
} & FirstNameInputType &
  LastNameInputType &
  StreetInputType &
  CityInputType &
  ZipInputType

export const initialValuesPersonalData = (data?: PersonalDataTypes): PersonalDataTypes => {
  return {
    firstName: data?.firstName || "",
    lastName: "Volný",
    foreigner: "no",
    birthDate: "01.01.1990",
    birthNumber: "820628/5549",
    gender: "man",
    birthPlace: "Ostrava",
    countryOrigin: "Česko",
    otherCountryOrigin: "Slovensko",
    residence: "Česko",
    citizen: "Česko",
    nextCitizen: "Albánie",
    street: "Keltičkova 1905/44",
    city: "Ostrava",
    zipInput: 74100,
    verificationMethod: "osobni",
    documentType: "Cestovní pas",
    documentValidity: "12.12.2024",
    documentNumber: "AK123456789",
    issuerOfTheDocument: "Úřad cestovního pasu",
    clientIdentificationDate: DateTime.now().toFormat(dateFormat),
    refusedIdentification: "no",
    doubtValidity: "no",
    sanctionList: "no",
  }
}

export const useValidationSchemaPersonalData = () => {
  return {
    firstName: firstNameValidator(),
    lastName: lastNameValidator(),
    foreigner: string().required().label(tStepClientIdentification("clientIsForeigner.label")),
    birthNumber: birthNumberValidator(),
    gender: string().required().label(tStepClientIdentification("gender.name")),
    birthPlace: string().required().label(tStepClientIdentification("birthPlace.name")),
    countryOrigin: string().required().label(tStepClientIdentification("countryOfOrigin.name")),
    otherCountryOrigin: string().label(tStepClientIdentification("otherCountryOfOrigin.name")),
    residence: string().required().label(tStepClientIdentification("placeOfResidence.name")),
    citizen: string().required().label(tStepClientIdentification("citizenShip.name")),
    nextCitizen: string().label(tStepClientIdentification("nextCitizenShip.name")),
    verificationMethod: string().required().label(tStepClientIdentification("identifyVerificationMethod.name")),
    street: streetValidator(),
    city: cityValidator(),
    zipInput: zipCodeValidator(),
    documentType: string().required().label(tStepClientIdentification("documentType.name")),
    documentValidity: date()
      .typeError(tValidator("date"))
      .required()
      .min(DateTime.now().toJSDate())
      .label(tStepClientIdentification("documentValidity.name")),
    documentNumber: string().required().label(tStepClientIdentification("documentNumber.name")),
    issuerOfTheDocument: string().required().label(tStepClientIdentification("issuerOfTheDocument.name")),
    clientIdentificationDate: date()
      .typeError(tValidator("date"))
      .required()
      .max(DateTime.now().toJSDate())
      .label(tStepClientIdentification("clientIdentificationDate.name")),
    refusedIdentification: string().required().label(tStepClientIdentification("refuseIdentification.name")),
    doubtValidity: string().required().label(tStepClientIdentification("doubtValidity.name")),
    sanctionList: string().required().label(tStepClientIdentification("sanctionList.name")),
  }
}

export default defineComponent({
  components: {
    FlagAutocompleteInput,
    SelectInput,
    RadioInput,
    DateInput,
    Street,
    TextInput,
    BirthNumberInput,
    FirstName,
    LastName,
    City,
    ZipInput,
  },
  props: {
    isForeigner: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const verification = ref<Array<{ title: string; value: string }>>([{ title: "Osobní ověření", value: "osobni" }])

    return {
      yesOrNoList: useYesOrNoList(),
      genderList: useGenderList(),
      verification,
      tStepClientIdentification,
    }
  },
})
</script>
