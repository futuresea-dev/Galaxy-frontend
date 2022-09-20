import { createApp } from "vue"
import App from "./App.vue"
import { vuetify } from "./plugins/vuetify"
import { loadFonts } from "./plugins/webfontloader"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "./plugins/fa"
import { i18n } from "./plugins/i18n"
import { mockServer } from "./services/mock"
import { router } from "./router/router"
import { createPinia } from "pinia"
import "./plugins/yup"
import { config } from "./config/config"
import { client } from "./services/api"
import { defineApiClient, defineRequestIdConfig } from "./requestor"
import { getToken } from "./services/accessToken"
import { useNotificationStore } from "./store/notifications"
import { requestIdConfig } from "./api"
import axios, { AxiosResponse } from "axios"

if (config.enableMock) {
  mockServer()
}

defineApiClient("default", {
  client,
  beforeRequest: (config) => {
    if (getToken()) {
      config.headers = { ...config.headers, Authorization: `Bearer ${getToken()}` }
    }

    return config
  },
  onError: (e, requestOptions) => {
    const notificationStore = useNotificationStore()

    if (requestOptions.showError) {
      if (axios.isAxiosError(e)) {
        const res = e.response as AxiosResponse<{ message: string; status: string; code: number }>

        notificationStore.add({
          id: Math.random().toFixed(),
          message: i18n.global.t(`errors.${res.data?.message || "ERROR"}`),
          type: "error",
        })
      } else {
        notificationStore.add({
          id: Math.random().toFixed(),
          message: e.message,
          type: "error",
        })
      }
    } else {
      window.console.error(e)
    }
  },
})

defineRequestIdConfig(requestIdConfig)

loadFonts()

createApp(App)
  .component("FontAwesomeIcon", FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .use(i18n)
  .use(vuetify)
  .mount("#app")
