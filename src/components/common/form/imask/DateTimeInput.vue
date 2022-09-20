<template>
  <mask-input :label="label" :name="name" mask-type="datetime" :callback="callback" />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import MaskInput from "../MaskInput.vue"
import BaseInput from "../BaseInput.vue"
import IMask from "imask"
import { dateTimeFormat, IMaskType } from "../../../../plugins/imask"
import { DateTime } from "luxon"

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
        const datetime = DateTime.fromFormat(val.value, dateTimeFormat)

        if (datetime.isValid) {
          return datetime.toUnixInteger()
        }

        return 0
      }

      return val.value
    }

    return {
      callback,
    }
  },
})
</script>
