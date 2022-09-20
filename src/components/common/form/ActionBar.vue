<template>
  <v-card-actions> <overview-button /><v-spacer></v-spacer><back-button /> <continue-button /> </v-card-actions>
</template>

<script lang="ts">
import ContinueButton from "../button/ContinueButton.vue"
import BackButton from "../button/BackButton.vue"
import OverviewButton from "../button/OverviewButton.vue"
export default {
  components: { OverviewButton, BackButton, ContinueButton },
}
</script>
