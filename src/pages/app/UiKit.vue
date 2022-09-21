<template>
  <v-app class="ma-6">
    <v-main>
      <div>
        <h1 class="text-h3 mb-3">Buttons</h1>
        <div class="py-2">
          <h2 class="text-h5 mb-3">Type submit Primary dark / light / data-test</h2>
          <submit-primary-dark :icon="Icons.Lock" :label="t('signInForm.submit.label')" data-test="sign-in" />
          <submit-primary-light :icon="Icons.Lock" :label="t('signInForm.submit.label')" data-test="sign-in" />
        </div>
        <v-divider color="#bbcdd9" />
        <div class="py-2">
          <h2 class="text-h5 mb-3">Secondary light / dark / icons</h2>
          <overview-button />
          <continue-button />
          <back-button />
        </div>
      </div>
      <chart />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { useI18n } from "vue-i18n"
import { defineComponent } from "vue"
import { Icons } from "../../services/icons"

import SubmitPrimaryDark from "../../components/common/button/SubmitPrimaryDark.vue"
import SubmitPrimaryLight from "../../components/common/button/SubmitPrimaryLight.vue"
import OverviewButton from "../../components/common/button/OverviewButton.vue"
import ContinueButton from "../../components/common/button/ContinueButton.vue"
import BackButton from "../../components/common/button/BackButton.vue"
import Chart from "../../components/chart.vue"

export default defineComponent({
  components: { BackButton, ContinueButton, OverviewButton, SubmitPrimaryDark, SubmitPrimaryLight, Chart },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    return {
      Icons,
      t,
    }
  },
})
</script>
