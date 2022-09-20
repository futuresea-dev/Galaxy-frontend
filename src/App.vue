<template>
  <template v-if="state.loading">
    <v-overlay :model-value="true" class="align-center justify-center">
      <v-progress-circular class="SmsLoader" color="white" indeterminate size="100"></v-progress-circular>
    </v-overlay>
  </template>
  <template v-else>
    <router-view />
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useRequestState } from "./requestor"
import { RequestId } from "./api"

export default defineComponent({
  setup() {
    return {
      state: useRequestState(RequestId.refresh),
    }
  },
})
</script>
<style scoped>
.SmsLoader {
  background: url(./logo.png) no-repeat;
  background-size: cover;
  border-radius: 50%;
}
</style>
