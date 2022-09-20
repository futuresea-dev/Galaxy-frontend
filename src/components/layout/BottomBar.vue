<template>
  <v-footer color="white" class="mt-10" padless>
    <div class="w-100">
      <v-row class="py-3">
        <v-col class="text-center d-none d-md-block" cols="4" />
        <v-col class="text-center d-flex items-center justify-center" sm="12" md="4">
          <a href="https://www.smsadmin.cz" class="LogoAdmin" target="_blank">
            <v-img src="./admin-logo.svg" alt="SMS Admin" width="100"></v-img>
          </a>
          <a href="https://www.smsgalaxy.cz" class="LogoGalaxy">
            <v-img src="./logo-footer.svg" alt="SMS Admin" width="100"></v-img>
          </a>
        </v-col>

        <v-col class="d-flex justify-center justify-md-end mb-5 mb-md-0" sm="12" md="4">
          <div v-for="(item, index) in socials" :key="index" class="text-center ml-5">
            <a :href="item.url" class="text-dark" target="_blank">
              <v-icon :icon="item.icon"></v-icon>
              <span class="text-dark d-sr-only">{{ item.title }}</span>
            </a>
          </div>
        </v-col>
      </v-row>
      <v-divider color="rgb(247, 247, 247)" />
      <div class="d-flex justify-center py-3 text-dark text-body-2 Copyright">
        {{ new Date().getFullYear() }} - &copy; <span class="text-primary">&nbsp;SMS finance, a.s.</span> Všechna práva
        vyhrazena
      </div>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import { Icons } from "../../services/icons"

export default defineComponent({
  name: "BottomBar",
  setup() {
    const { t } = useI18n()

    return {
      socials: [
        {
          title: "Facebook",
          url: "https://www.facebook.com/SMS-Finance-A-s-160989841008984/",
          icon: Icons.Facebook,
        },
        {
          title: "LinkedIn",
          url: "https://www.linkedin.com/company/sms-finance/",
          icon: Icons.LinkedIn,
        },
        {
          title: "Instagram",
          url: "https://www.instagram.com/sms_finance/",
          icon: Icons.Instagram,
        },
      ],
      t,
      Icons,
    }
  },
})
</script>

<style lang="scss" scoped>
.LogoAdmin {
  opacity: 0.6;

  &:hover {
    opacity: 0.8;
  }
}
.LogoGalaxy {
  opacity: 0.2;
}
.Copyright {
  opacity: 0.7;
}
</style>
