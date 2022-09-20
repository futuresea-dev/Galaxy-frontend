<template>
  <base-button color="primary" :icon="icon" :label="label" :data-test="dataTest" type="submit" :loading="loading" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import BaseButton from "./BaseButton.vue"

export default defineComponent({
  components: { BaseButton },
  extends: BaseButton,
})
</script>
