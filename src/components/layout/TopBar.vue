<template>
  <v-app-bar elevation="0" height="70" color="dark">
    <v-app-bar-title>{{ title }}</v-app-bar-title>
    <v-spacer></v-spacer>

    <v-avatar variant="tonal">
      <v-img v-if="img" :src="img" :alt="fullName" />
      <span v-else class="text-white">{{ initials }}</span>
    </v-avatar>

    <template #append>
      <div v-if="lgAndUp" class="d-flex justify-center align-center ml-3 mr-5">
        <span class="UserFullname">{{ fullName }}</span>
      </div>
      <v-menu>
        <template #activator="{ props }">
          <v-btn :icon="Icons.Ellipsis" variant="text" v-bind="props" />
        </template>
        <v-list color="grey-lighten-2">
          <v-list-item v-for="(item, index) in items" :key="index" :to="{ name: item.route }">
            <v-list-item-title>{{ t(item.title) }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { useUserStore } from "../../store/user"
import { storeToRefs } from "pinia"
import { useDisplay } from "vuetify"
import { Routes } from "../../router/routes"
import { Icons } from "../../services/icons"

export default defineComponent({
  name: "TopBar",
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const userStore = useUserStore()
    const { initials, fullName, img } = storeToRefs(userStore)
    const { lgAndUp } = useDisplay()

    const title = computed(() => {
      return t(`pages.${route.name?.toString()}`)
    })

    return {
      title,
      initials,
      fullName,
      img,
      lgAndUp,
      Icons,
      items: [
        { title: `pages.${Routes.VIDEO_MANUALS}`, route: Routes.VIDEO_MANUALS },
        { title: `pages.${Routes.DOCUMENTATIONS}`, route: Routes.DOCUMENTATIONS },
        { title: `pages.${Routes.SUPPORTS}`, route: Routes.SUPPORTS },
      ],
      t,
    }
  },
})
</script>

<style lang="scss" scoped>
.UserFullname {
  font-size: 1.5rem;
  font-family: "Open Sans", sans-serif;
  font-weight: 300;
  font-stretch: 75%;
}
</style>
