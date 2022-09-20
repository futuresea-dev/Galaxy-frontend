<template>
  <v-card-text class="text-h6 text-dark font-stretch-condensed font-weight-bold mt-5 mb-4 pl-0">
    {{ t(title) }}
  </v-card-text>

  <div class="pb-5">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
})
</script>

<style lang="scss" scoped>
.GdprContainer {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
}
</style>
