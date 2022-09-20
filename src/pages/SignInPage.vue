<template>
  <div class="SignInPage">
    <notifications />
    <v-container fluid class="d-flex justify-center align-center fill-height">
      <div>
        <sign-in-form />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import SignInForm from "../components/sign-in/SignInForm.vue"
import Notifications from "../components/common/notifications/Notifications.vue"
import { defineComponent } from "vue"

export default defineComponent({
  components: { SignInForm, Notifications },
})
</script>

<style lang="scss" scoped>
.SignInPage {
  background: url(./sign-in-page-bg.jpg) no-repeat;
  background-size: cover;
  .v-container {
    min-height: 100vh;
  }
}
</style>
