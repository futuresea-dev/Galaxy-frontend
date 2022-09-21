<template>
  <slot name="hero">
    <hero-content>{{ t(heroContent) }} </hero-content>
  </slot>
  <div class="ma-6">
    <div class="mb-10">
      <h1 class="text-h4 text-dark">{{ t(title) }}</h1>
    </div>

    <v-container class="FormContainer">
      <v-card class="px-5">
        <slot></slot>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import HeroContent from "../HeroContent.vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  components: {
    HeroContent,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    heroContent: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' })

    return {
      t,
    }
  },
})
</script>

<style lang="scss" scoped>
.FormContainer {
  width: 90%;
}
</style>
