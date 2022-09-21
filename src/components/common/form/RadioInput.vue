<template>
  <p>{{ t(title) }}</p>
  <v-radio-group v-model="value" :inline="inline" :name="name" :error-messages="errorMessage">
    <v-radio v-for="item in items" :key="item.value" :value="item.value" :label="item.title" color="purple" />
  </v-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import BaseInput from "./BaseInput.vue"
import { Icons } from "../../../services/icons"
import { useField } from "vee-validate"
import { useI18n } from "vue-i18n"

export type RadioItem = {
  title: string
  value: string | number
}

export default defineComponent({
  extends: BaseInput,
  props: {
    items: {
      type: Array as PropType<Array<RadioItem>>,
      required: true,
    },
    inline: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name)
    const { t } = useI18n({ useScope: 'global' })
    return {
      Icons,
      value,
      errorMessage,
      t,
    }
  },
})
</script>
