<template>
  <v-text-field
    v-model="value"
    :name="name"
    :type="type"
    :error-messages="errorMessage"
    :placeholder="placeholder"
    :label="label"
    :density="density"
    data-test="dataTest"
    variant="underlined"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { useField } from "vee-validate"
import BaseInput from "./BaseInput.vue"
import DataTestAttribute from "../test/DataTestAttribute.vue"

export default defineComponent({
  extends: BaseInput,
  DataTestAttribute,
  props: {
    type: {
      type: String as PropType<"text" | "email" | "password">,
      default: "text",
    },
  },
  setup(props) {
    const { value, errorMessage } = useField(props.name)

    return {
      value,
      errorMessage,
    }
  },
})
</script>
