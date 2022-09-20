<template>
  <v-select v-model="value" :items="items" :label="label" :name="name" :placeholder="placeholder" :density="density" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import BaseInput from "./BaseInput.vue"
import { useField } from "vee-validate"

export default defineComponent({
  extends: BaseInput,
  props: {
    items: {
      type: Array as PropType<Array<{ title: string; value: string }>>,
      default: () => [],
    },
  },
  setup(props) {
    const { value } = useField<string>(props.name)
    return {
      value,
    }
  },
})
</script>
