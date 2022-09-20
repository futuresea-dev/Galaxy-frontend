<template>
  <base-button :label="t('submit.types.back')" text="text-gray" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import BaseButton from "./BaseButton.vue"

export default defineComponent({
  components: { BaseButton },
  setup() {
    const { t } = useI18n()
    return {
      t,
    }
  },
})
</script>
