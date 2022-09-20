import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import vueI18n from "@intlify/vite-plugin-vue-i18n"
import * as path from "path"
import vuetify from "vite-plugin-vuetify"
import { setDefaultResultOrder } from "dns"

setDefaultResultOrder("verbatim")

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: path.resolve(__dirname, "./src/locales/**"),
    }),
    vuetify({ autoImport: true, styles: "expose" }),
    eslintPlugin(),
  ],
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
})
