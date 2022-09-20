<template>
  <mask-input :label="label" :name="name" mask-type="money" :callback="callback" :suffix="currency" />
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
      type: String as PropType<"float">,
      required: false,
      default: "float",
    },
    currency: {
      type: String as PropType<string>,
      required: false,
      default: "Kč",
    },
  },
  setup() {
    const callback = (val: IMask.InputMask<IMaskType>) => {
      if (val.unmaskedValue.length - 1 > Number.MAX_SAFE_INTEGER.toString(10).length) {
        window.console.warn(`The number [${val.unmaskedValue}] is bigger then safe integer.`)
      }

      if (!val.unmaskedValue) {
        return 0
      }

      return parseFloat(val.unmaskedValue)
    }

    return {
      callback,
    }
  },
})
</script>
