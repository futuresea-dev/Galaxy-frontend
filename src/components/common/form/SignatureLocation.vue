<template>
  <text-input :label="t('stepPersonalData.stepPersonalData.signatureLocation')" name="signatureLocation" type="text" />
</template>
<script lang="ts">
import { defineComponent } from "vue"
import TextInput from "./TextInput.vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  components: { TextInput },
  setup() {
    const { t } = useI18n()
    return {
      t,
    }
  },
})
</script>
