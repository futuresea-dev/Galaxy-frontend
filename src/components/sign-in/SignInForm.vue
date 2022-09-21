<template>
  <form id="sign-in-form" class="SignInForm" @submit="onSubmit">
    <v-card class="VCard px-5">
      <v-card-title class="text-uppercase text-dark px-0 mb-4 mt-1 pt-8">
        <div class="d-flex justify-center mb-10">
          <v-img src="./logo-full.svg" class="Logo" />
          <div class="sr-only">
            {{ t("signInForm.title") }}
          </div>
        </div>
      </v-card-title>
      <div>
        <v-row class="FormInner">
          <v-col cols="12">
            <text-input name="username" :label="t('signInForm.username.label')" />
          </v-col>
          <v-col cols="12">
            <text-input name="password" type="password" :label="t('signInForm.password.label')" />
          </v-col>
        </v-row>
        <div class="d-flex justify-center pt-5">
          <SubmitPrimaryLight
            :loading="state.loading"
            :icon="Icons.Lock"
            :label="t('signInForm.submit.label')"
            data-test="sign-in"
          />
        </div>
        <v-divider color="#gray-200" class="mt-8" />
      </div>
      <v-card-actions>
        <div class="text-dark d-flex align-center py-4">
          <v-icon :icon="Icons.Phone" class="text-success mr-5" />
          <div>
            <div class="text-body-2">IT podpora</div>
            <div class="text-body-2 TextEmail">podpora@smsfinance.cz</div>
          </div>
        </div>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useForm } from "vee-validate"
import { object, string } from "yup"
import TextInput from "../common/form/TextInput.vue"
import { useI18n } from "vue-i18n"
import { useUserStore } from "../../store/user"
import { useRouter } from "vue-router"
import { Routes } from "../../router/routes"
import { Icons } from "../../services/icons"
import { useRequestState } from "../../requestor"
import { RequestId } from "../../api"
import SubmitPrimaryLight from "../common/button/SubmitPrimaryLight.vue"

type SignInForm = {
  username: string
  password: string
}

export default defineComponent({
  components: { SubmitPrimaryLight, TextInput },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const { handleSubmit } = useForm<SignInForm>({
      initialValues: {
        username: "user",
        password: "password",
      },
      validationSchema: object({
        username: string().label(t("signInForm.username.name")).required(),
        password: string().label(t("signInForm.password.name")).required(),
      }),
    })
    const userStore = useUserStore()
    const router = useRouter()

    const onSubmit = handleSubmit(async (values) => {
      if (await userStore.signIn(values.username, values.password)) {
        await router.push({ name: Routes.HOME })
      }
    })

    return {
      onSubmit,
      t,
      state: useRequestState(RequestId.signIn),
      Icons,
    }
  },
})
</script>

<style lang="scss" scoped>
.SignInForm {
  width: 100%;

  @media (min-width: 32rem) {
    width: 31rem;
  }

  :deep .v-input__details {
    margin-bottom: 0;
  }
}
.TextEmail {
  opacity: 0.7;
}
.Logo {
  max-width: 220px;
}
.VCard {
  border-radius: 15px;
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.13),
    0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}
.FormInner {
  max-width: 20rem;
  margin: 0 auto;
}
</style>
