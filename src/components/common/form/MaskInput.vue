<template>
  <input :name="name" type="text" class="d-none" />
  <v-text-field
    ref="el"
    :model-value="formattedValue"
    :name="`${name}-formatted`"
    type="text"
    :error-messages="errorMessage"
    :placeholder="placeholder"
    :label="label"
    :density="density"
    :suffix="suffix"
    variant="underlined"
    :readonly="readonly"
    :disabled="disabled"
  >
  </v-text-field>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, onUpdated, PropType, ref } from "vue"
import IMask from "imask"
import { useField } from "vee-validate"
import BaseInput from "./BaseInput.vue"
import { Country, MaskType, types, IMaskType } from "../../../plugins/imask"
import { convertToString } from "../../../services/cast"

export default defineComponent({
  extends: BaseInput,
  props: {
    maskCountry: {
      type: String as PropType<Country>,
      required: false,
      default: "CZ",
    },
    maskType: {
      type: String as PropType<MaskType>,
      required: true,
    },
    callback: {
      type: Function as PropType<(val: IMask.InputMask<IMaskType>) => string | number>,
      default: (val: IMask.InputMask<IMaskType>) => val.unmaskedValue,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  setup: function (props) {
    const { errorMessage, value, setValue } = useField<string | number | null | undefined>(props.name, [], {
      initialValue: convertToString(props.modelValue),
    })

    console.log(value.value)
    const el = ref()
    const formattedValue = ref<string | number | null | undefined>()
    let maskInput: IMask.InputMask<IMaskType> | null = null

    onMounted(() => {
      const input = el.value.$el.querySelector("input")

      maskInput = IMask(input, types[props.maskCountry][props.maskType])
      maskInput.on("accept", () => {
        if (maskInput) {
          setValue(props.callback(maskInput))

          formattedValue.value = maskInput.value
        }
      })

      maskInput.value = convertToString(value.value)
      formattedValue.value = maskInput.value
    })


    onBeforeUnmount(() => {
      if (maskInput) {
        maskInput.destroy()
      }
    })

    return {
      errorMessage,
      el,
      formattedValue,
    }
  },
})
</script>
