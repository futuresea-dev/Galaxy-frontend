<template>
  <v-app>
    <v-main>
      <v-container>
        <v-toolbar>
          <v-toolbar-title>Mask inputs</v-toolbar-title>
        </v-toolbar>
        <form id="mask-form" @submit="onSubmit">
          <date-input :label="t('mask.date.label')" name="date" return-type="int" />
          <date-time-input label="dateTime" name="dateTime" return-type="string" />
          <time-input label="time" name="time" />
          <money-input label="money" name="money" />
          <number-input label="number" name="number" />
          <birth-number-input label="birthNumber" name="birthNumber" return-type="int" />
          <phone-input label="phone" name="phone" return-type="int" />
          <zip-input label="zip" name="zip" return-type="int" />
          <prefix-phone-input label="prefixPhone" name="prefixPhone" return-type="int" />
          <v-btn type="submit"> Test </v-btn>
        </form>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import { useForm } from "vee-validate"
import { object } from "yup"
import {
  birthNumberValidator,
  dateTimeValidator,
  dateValidator,
  moneyValidator,
  numberValidator,
  timeValidator,
  phoneValidator,
} from "../services/validator"
import DateTimeInput from "../components/common/form/imask/DateTimeInput.vue"
import DateInput from "../components/common/form/imask/DateInput.vue"
import TimeInput from "../components/common/form/imask/TimeInput.vue"
import MoneyInput from "../components/common/form/imask/MoneyInput.vue"
import NumberInput from "../components/common/form/imask/NumberInput.vue"
import BirthNumberInput from "../components/common/form/imask/BirthNumberInput.vue"
import PhoneInput from "../components/common/form/imask/PhoneInput.vue"
import ZipInput from "../components/common/form/imask/ZipInput.vue"
import PrefixPhoneInput from "../components/common/form/imask/PrefixPhoneInput.vue"

type MaskForm = {
  date: string
  dateTime: string
  time: string
  money: number
  number: number
  birthNumber: string | undefined
  phone: string | undefined
  zip: string | undefined
  prefixPhone: string | undefined
}

export default defineComponent({
  components: {
    PrefixPhoneInput,
    PhoneInput,
    BirthNumberInput,
    NumberInput,
    MoneyInput,
    TimeInput,
    DateInput,
    DateTimeInput,
    ZipInput,
  },
  setup() {
    const { t } = useI18n()
    const { handleSubmit } = useForm<MaskForm>({
      validationSchema: object({
        date: dateValidator().label(t("mask.date.name")).required(),
        dateTime: dateTimeValidator().label(t("mask.dateTime.name")).required(),
        time: timeValidator().label(t("mask.time.name")).required(),
        money: moneyValidator().label(t("mask.money.name")).required(),
        number: numberValidator().min(10).label(t("mask.money.name")).required(),
        birthNumber: birthNumberValidator(),
        phone: phoneValidator().label(t("mask.money.name")).required(),
      }),
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onSubmit = handleSubmit(async () => {})

    return {
      onSubmit,
      t,
    }
  },
})
</script>
