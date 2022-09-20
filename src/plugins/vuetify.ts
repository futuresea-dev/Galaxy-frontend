// Styles
import "./main.scss"

import { aliases, fa } from "vuetify/lib/iconsets/fa-svg"
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n"

// Vuetify
import { createVuetify, ThemeDefinition } from "vuetify"
import { i18n } from "./i18n"
import { useI18n } from "vue-i18n"

const GalaxyLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: "#f7f7f7",
    surface: "#FFFFFF",
    primary: "#ef404a",
    "primary-darken-1": "#d53942",
    secondary: "#03DAC6",
    "secondary-darken-1": "#3B4145",
    error: "#ef404a",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    dark: "#4d555b",
    brown: "#8e271f",
    purple: "#9c27b0",
    "gray-200": "#bbcdd9",
    "gray-300": "#8f9da6",
    "gray-400": "#79858d",
    "gray-500": "#636d74",
    "gray-600": "#4d555b",
    "gray-700": "#3b4145",
  },
}

const GalaxyDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: "#000000",
    surface: "#FFFFFF",
    primary: "#ef404a",
    "primary-darken-1": "#d53942",
    secondary: "#03DAC6",
    "secondary-darken-1": "#3B4145",
    error: "#ef404a",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    dark: "#4d555b",
    brown: "#8e271f",
    purple: "#9c27b0",
    "gray-200": "#bbcdd9",
    "gray-300": "#8f9da6",
    "gray-400": "#79858d",
    "gray-500": "#636d74",
    "gray-600": "#4d555b",
    "gray-700": "#3b4145",
  },
}

export const vuetify = createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: GalaxyLightTheme,
      dark: GalaxyDarkTheme,
    },
  },
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  // @ts-ignore todo solve after update to LTS version of vuetify
  locale: createVueI18nAdapter({ i18n, useI18n }),
})
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
