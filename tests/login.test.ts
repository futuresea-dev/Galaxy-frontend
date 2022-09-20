import { mount } from "@vue/test-utils"
import { test, expect } from "vitest"
import SignIn from "../src/components/sign-in/SignInForm.vue"
import { defineApiClient } from "../src/requestor"
import axios from "axios"
import { vuetify, FontAwesomeIcon, i18n, pinia, router } from "./config"

test("mount component", async () => {
  expect(SignIn).toBeTruthy()

  defineApiClient("default", { client: axios.create() })

  const wrapper = mount(SignIn, {
    global: {
      plugins: [i18n, pinia, router, vuetify],
      components: {
        FontAwesomeIcon,
      },
    },
  })

  expect(wrapper.text()).toContain("Přihlásit se")
})
