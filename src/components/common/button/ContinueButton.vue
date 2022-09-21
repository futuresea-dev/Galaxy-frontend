<template>
  <base-button
    :label="t('submit.types.continue')"
    :icon="Icons.ArrowRight"
    text="text-purple"
    class="font-weight-bold"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import BaseButton from "./BaseButton.vue"
import { Icons } from "../../../services/icons"

export default defineComponent({
  components: { BaseButton },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    return {
      t,
      Icons,
    }
  },
})
</script>
