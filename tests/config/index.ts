import { createPinia } from "pinia"
import { i18n } from "../../src/plugins/i18n"
import { router } from "../../src/router/router"
import { vuetify } from "../../src/plugins/vuetify"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import "../../src/plugins/fa"

const pinia = createPinia()

export { vuetify, i18n, FontAwesomeIcon, router, pinia }
