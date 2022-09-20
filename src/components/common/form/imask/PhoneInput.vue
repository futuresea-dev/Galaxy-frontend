<template>
  <mask-input :label="t('address.phone.label')" name="phone" mask-type="phone" :callback="callback" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MaskInput from "../MaskInput.vue"
import { useI18n } from "vue-i18n"
import IMask from "imask"
import { IMaskType } from "../../../../plugins/imask"
import { convertToInt } from "../../../../services/cast"

export default defineComponent({
  components: { MaskInput },
  setup() {
    const { t } = useI18n()
    const callback = (val: IMask.InputMask<IMaskType>) => {
      if (!val.value) {
        return 0
      }

      return convertToInt(val.value)
    }

    return {
      callback,
      t,
    }
  },
})
</script>
