<template>
  <mask-input :label="t('address.prefix.label')" name="prefixPhone" mask-type="prefixPhone" :callback="callback" />
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
      return val.value
    }

    return {
      callback,
      t,
    }
  },
})
</script>
