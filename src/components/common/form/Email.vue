<template>
  <text-input :label="t('address.email.label')" name="email" type="email" />
</template>
<script lang="ts">
import { defineComponent } from "vue"
import TextInput from "./TextInput.vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  components: { TextInput },
  setup() {
    const { t } = useI18n({ useScope: 'global' })

    return {
      t,
    }
  },
})
</script>
