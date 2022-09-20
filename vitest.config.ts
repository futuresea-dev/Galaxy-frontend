import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import vuetify from "vite-plugin-vuetify"
import path from "path"

export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
    vuetify(),
  ],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "tests/config/vuetify.config.js",
    deps: {
      inline: ["vuetify"],
    },
    coverage: {
      reporter: ["text", "html", "cobertura"],
      100: false,
      lines: 50,
      functions: 50,
      branches: 50,
      statements: 50,
    },
  },
})
