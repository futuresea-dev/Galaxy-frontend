<template>
  <mask-input :label="label" :name="name" mask-type="time" :callback="callback" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import MaskInput from "../MaskInput.vue"
import BaseInput from "../BaseInput.vue"
import IMask from "imask"
import { IMaskType } from "../../../../plugins/imask"

export default defineComponent({
  components: { MaskInput },
  extends: BaseInput,
  props: {
    returnType: {
      type: String as PropType<"string">,
      required: false,
      default: "string",
    },
  },
  setup() {
    const callback = (val: IMask.InputMask<IMaskType>) => {
      return val.value
    }

    return {
      callback,
    }
  },
})
</script>
