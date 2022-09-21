<template>
  <v-navigation-drawer
    :width="72"
    color="grey-darken-4 NavigationDrawerPanel"
    permanent
    :border="0"
    disable-route-watcher
    elevation="8"
  >
    <v-list density="compact" class="NavigationLogo pt-3 mb-3" nav>
      <v-list-item prepend-avatar="./logo.svg" />
    </v-list>
    <v-divider color="rgba(191,195,198,0.3)"></v-divider>
    <v-list v-for="(item, index) in items" :key="index" density="compact" nav>
      <v-list-item :prepend-icon="item.icon" :to="{ name: item.route }" class="d-flex justify-center"></v-list-item>
    </v-list>
    <v-divider color="rgba(191,195,198,0.3)"></v-divider>
    <template #append>
      <v-list density="compact" nav>
        <v-list-item
          :prepend-icon="drawer ? Icons.On : Icons.Off"
          class="d-flex justify-center"
          @click="toggleMenu"
        ></v-list-item>
      </v-list>
      <v-list density="compact" nav>
        <v-list-item
          v-if="singOutLoading === false"
          :action="t('pages.sign-out')"
          :prepend-icon="Icons.PowerOff"
          :disabled="singOutLoading"
          class="d-flex justify-center"
          @click="signOut"
        >
        </v-list-item>
        <v-list-item v-else>
          <v-progress-circular class="d-flex justify-center" indeterminate size="30" />
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
  <v-navigation-drawer
    v-model="drawer"
    color="grey-darken-3 NavigationDrawerExpanded"
    :border="0"
    disable-route-watcher
    elevation="8"
  >
    <v-list density="compact" class="pt-1 mb-0 pb-1" nav>
      <v-list-item :max-width="136">
        <v-img src="./ico-galaxy.svg"></v-img>
      </v-list-item>
    </v-list>
    <v-divider color="rgba(191,195,198,0.3)"></v-divider>
    <v-list v-for="(item, index) in items" :key="index" density="compact" nav>
      <v-list-item :title="t(item.title)" :to="{ name: item.route }"></v-list-item>
    </v-list>
    <v-divider color="rgba(191,195,198,0.3)"></v-divider>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute, useRouter } from "vue-router"
import { Routes } from "../../router/routes"
import { Icons } from "../../services/icons"
import { useUserStore } from "../../store/user"
import { api, RequestId } from "../../api"
import { useRequest, useRequestLoading } from "../../requestor"

export default defineComponent({
  name: "Navigation",
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore()
    const drawer = ref<boolean>(true)
    const title = computed(() => {
      return t(`pages.${route.name?.toString()}`)
    })
    const { execute } = useRequest()
    const menuStateLocalStorage = "menu-default-state-"

    onMounted(() => {
      const res = localStorage.getItem(menuStateLocalStorage + userStore.userId)

      if (res != null) {
        drawer.value = res === "true"
      }
    })

    const signOut = async () => {
      await execute(api.signOut(), "signOut")
      await router.push({ name: Routes.SIGN_IN })
    }

    const toggleMenu = () => {
      drawer.value = !drawer.value
      localStorage.setItem(menuStateLocalStorage + userStore.userId, drawer.value.toString())
    }

    return {
      title,
      drawer,
      Icons,
      items: [
        { title: `pages.${Routes.HOME}`, route: Routes.HOME, icon: Icons.Megaphone },
        { title: `pages.${Routes.GDPR}`, route: Routes.GDPR, icon: Icons.Gdpr },
        { title: `pages.${Routes.INTRO_RECORDS}`, route: Routes.INTRO_RECORDS, icon: Icons.Hands },
        { title: `pages.${Routes.DIAGNOSTICS}`, route: Routes.DIAGNOSTICS, icon: Icons.Diagnostic },
        { title: `pages.${Routes.MEETING_RECORDS}`, route: Routes.MEETING_RECORDS, icon: Icons.Law },
        { title: `pages.${Routes.CALCULATORS}`, route: Routes.CALCULATORS, icon: Icons.Calculator },
        { title: `pages.${Routes.DOCUMENTS}`, route: Routes.DOCUMENTS, icon: Icons.Document },
      ],
      t,
      signOut,
      toggleMenu,
      singOutLoading: useRequestLoading(RequestId.signOut),
    }
  },
})
</script>

<style lang="scss">
.v-navigation-drawer {
  .v-list.v-list--nav {
    background: none;
    color: #fff;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
}

.NavigationDrawerPanel.v-navigation-drawer {
  background: linear-gradient(45deg, #59181b 0%, #2e1876 100%);

  .v-list-item__prepend > .v-icon {
    margin-right: 0;
  }
}

.NavigationDrawerExpanded.v-navigation-drawer {
  background: linear-gradient(45deg, #a22c32 0%, #562cde 100%);

  .v-list-item--nav .v-list-item-title {
    font-size: 1rem;
  }
}

.NavigationLogo {
  padding: 0;
  display: flex;
  justify-content: center;

  .v-avatar {
    margin: 0;
    --v-avatar-height: 48px;
  }
}

.v-list-item__content,
.v-list-item-title {
  overflow: visible;
}
</style>
