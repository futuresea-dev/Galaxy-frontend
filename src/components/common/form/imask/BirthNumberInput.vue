<template>
  <mask-input :label="label" :name="name" mask-type="birthNumber" :callback="callback" />
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
      type: String as PropType<"string" | "int">,
      required: false,
      default: "string",
    },
  },
  setup(props) {
    const callback = (val: IMask.InputMask<IMaskType>) => {
      if (props.returnType === "int") {
        return val.unmaskedValue
      }

      return parseInt(val.value, 10)
    }

    return {
      callback,
    }
  },
})
</script>
