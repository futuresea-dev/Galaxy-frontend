<template>
  <v-banner prominent class="mb-8">
    <v-img :src="background" alt="background" class="HeroBackground" cover />
    <v-banner-text class="position-relative text-white text-center text-uppercase w-75 mx-auto py-10">
      <slot />
    </v-banner-text>
  </v-banner>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    background: {
      type: String,
      required: false,
      default: "/hero-bg.jpg",
    },
  },
})
</script>

<style lang="scss" scoped>
.HeroBackground {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
