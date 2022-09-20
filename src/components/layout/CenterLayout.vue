<template>
  <v-app>
    <notifications />
    <v-main>
      <v-container fluid class="d-flex justify-center align-center fill-height">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Notifications from "../common/notifications/Notifications.vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: { Notifications },
})
</script>
