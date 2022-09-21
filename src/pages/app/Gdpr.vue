<template>
  <form-page-layout
    hero-content="stepPersonalData.stepPersonalData.content"
    title="stepPersonalData.stepPersonalData.title"
  >
    <form id="gdpr-form" @submit="onSubmit">
      <v-tabs fixed-tabs theme="dark" class="my-5">
        <v-tab disabled> Fyzická osoba </v-tab>
      </v-tabs>
      <v-divider color="#gray-200" class="mb-7" />

      <form-section title="stepPersonalData.stepPersonalData.mandatory">
        <v-row>
          <v-col cols="12" md="3">
            <last-name />
          </v-col>
          <v-col cols="12" md="3">
            <first-name />
          </v-col>
          <v-col cols="4" md="2">
            <prefix-phone-input />
          </v-col>
          <v-col cols="8" md="4">
            <phone-input />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <street @suggestion="onSuggestion" />
          </v-col>
          <v-col cols="12" md="3">
            <city />
          </v-col>
          <v-col cols="12" md="3">
            <zip-input />
          </v-col>
        </v-row>
      </form-section>
      <form-section title="stepPersonalData.stepPersonalData.optional">
        <v-row>
          <v-col cols="12" sm="4">
            <email />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="4">
            <date-input :label="t('stepPersonalData.stepPersonalData.date')" name="today" readonly />
          </v-col>
          <v-spacer />
          <v-col cols="12" sm="4">
            <signature-location />
          </v-col>
        </v-row>
      </form-section>
    </form>
  </form-page-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import { useForm } from "vee-validate"
import { object } from "yup"
import {
  firstNameValidator,
  lastNameValidator,
  phoneValidator,
  streetValidator,
  cityValidator,
  zipCodeValidator,
  prefixPhoneValidator,
  emailValidator,
} from "../../services/validator"
import { Icons } from "../../services/icons"
import FirstName from "../../components/common/form/FirstName.vue"
import LastName from "../../components/common/form/LastName.vue"
import Street, { SuggestionItem } from "../../components/common/form/Street.vue"
import City from "../../components/common/form/City.vue"
import ZipInput from "../../components/common/form/imask/ZipInput.vue"
import PhoneInput from "../../components/common/form/imask/PhoneInput.vue"
import PrefixPhoneInput from "../../components/common/form/imask/PrefixPhoneInput.vue"

import {
  CityInputType,
  FirstNameInputType,
  LastNameInputType,
  StreetInputType,
  PhoneInputType,
  PrefixPhoneInputType,
  ZipInputType,
  EmailInputType,
} from "../../components/common/form/InputTypes"
import Email from "../../components/common/form/Email.vue"
import DateInput from "../../components/common/form/imask/DateInput.vue"
import { DateTime } from "luxon"
import { dateFormat } from "../../plugins/imask"
import SignatureLocation from "../../components/common/form/SignatureLocation.vue"
import FormPageLayout from "../../components/layout/FormPageLayout.vue"
import FormSection from "../../components/layout/FormSection.vue"

type GdprForm = {
  email?: string
  today: string
  signatureLocation?: string
} & FirstNameInputType &
  LastNameInputType &
  PhoneInputType &
  PrefixPhoneInputType &
  StreetInputType &
  CityInputType &
  ZipInputType &
  EmailInputType

export default defineComponent({
  components: {
    FormSection,
    FormPageLayout,
    SignatureLocation,
    DateInput,
    Email,
    PrefixPhoneInput,
    PhoneInput,
    FirstName,
    LastName,
    Street,
    City,
    ZipInput,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' })

    const { values, handleSubmit, setFieldValue } = useForm<GdprForm>({
      initialValues: {
        firstName: "Petr",
        street: "Keltičkova 1905/44",
        city: "Ostrava",
        zipInput: 54001,
        phone: 742123456,
        prefixPhone: "+420",
        lastName: "asdasd",
        email: "neco@neco.cz",
        today: DateTime.now().toFormat(dateFormat),
        signatureLocation: "Ostrava",
      },
      validationSchema: object({
        firstName: firstNameValidator(),
        lastName: lastNameValidator(),
        phone: phoneValidator(),
        street: streetValidator(),
        city: cityValidator(),
        zipInput: zipCodeValidator(),
        prefixPhone: prefixPhoneValidator(),
        email: emailValidator(),
      }),
    })

    const onSubmit = handleSubmit((values) => {
      // eslint-disable-next-line
      console.log(values)
    })

    const onSuggestion = (item: SuggestionItem) => {
      if (item.city) {
        setFieldValue("city", item.city)
      }
    }

    return {
      onSubmit,
      t,
      Icons,
      values,
      onSuggestion,
    }
  },
})
</script>
