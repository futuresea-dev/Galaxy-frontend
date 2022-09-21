<template>
  <mask-input :label="t('address.zip.label')" name="zipInput" mask-type="zip" :callback="callback" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MaskInput from "../MaskInput.vue"
import IMask from "imask"
import { IMaskType } from "../../../../plugins/imask"
import { useI18n } from "vue-i18n"

export default defineComponent({
  components: { MaskInput },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const callback = (val: IMask.InputMask<IMaskType>) => {
      if (!val.value) {
        return 0
      }

      return parseInt(val.value.replaceAll(" ", ""), 10)
    }

    return {
      callback,
      t,
    }
  },
})
</script>
