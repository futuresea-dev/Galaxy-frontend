<template>
  <img :src="`data:image/png;base64,${encodedImage}`" :alt="title" />
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    encodedImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
      default: "img",
    },
  },
})
</script>
