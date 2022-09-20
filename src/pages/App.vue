<template>
  <v-app>
    <Navigation />
    <TopBar id="topbar" />
    <v-main>
      <router-view />
    </v-main>
    <BottomBar />
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Navigation from "../components/layout/Navigation.vue"
import TopBar from "../components/layout/TopBar.vue"
import BottomBar from "../components/layout/BottomBar.vue"

export default defineComponent({
  components: { BottomBar, TopBar, Navigation },
})
</script>
