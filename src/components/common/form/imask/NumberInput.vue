<template>
  <mask-input :label="label" :name="name" mask-type="number" :callback="callback" />
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
      type: String as PropType<"float" | "int">,
      required: false,
      default: "float",
    },
  },
  setup(props) {
    const callback = (val: IMask.InputMask<IMaskType>) => {
      if (!val.unmaskedValue) {
        return 0
      }

      if (props.returnType === "int") {
        if (val.unmaskedValue.length > Number.MAX_SAFE_INTEGER.toString(10).length) {
          window.console.warn(`The number [${val.unmaskedValue}] is bigger then safe integer.`)
        }

        return parseInt(val.unmaskedValue, 10)
      }

      if (val.unmaskedValue.length - 1 > Number.MAX_SAFE_INTEGER.toString(10).length) {
        window.console.warn(`The number [${val.unmaskedValue}] is bigger then safe float.`)
      }

      return parseFloat(val.unmaskedValue)
    }

    return {
      callback,
    }
  },
})
</script>
