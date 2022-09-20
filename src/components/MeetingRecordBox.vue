<template>
  <v-card elevation="4">
    <v-img :src="image" :alt="title" />
    <div class="d-flex align-center text-gray-600 mb-6 pt-1">
      <v-icon v-if="icon" :icon="Icons[icon]" large class="mx-5" />
      <div>
        <h3 class="text-h6 font-weight-bold font-stretch-condensed">
          {{ title }}
        </h3>
        {{ prefix }} <span>&#8226;</span> {{ description }}
      </div>
    </div>
    <div class="px-2">
      <div class="text-uppercase text-gray-400 font-weight-bold text-right px-2">{{ t("cards.titles.stats") }}</div>
      <v-divider color="gray-400" />
    </div>
    <div v-if="stats" class="px-2 mb-8">
      <RecordProgress :stat="statsWithTitle.last" class="my-3" />
      <RecordProgress :stat="statsWithTitle.current" class="my-3" />
    </div>
    <div class="px-2">
      <div class="text-uppercase text-gray-400 font-weight-bold text-right px-2">{{ t("cards.titles.history") }}</div>
      <v-divider color="gray-400" />
    </div>
    <div v-if="lastRecord" class="bg-background mx-2 px-4 py-2 d-flex align-center mb-8">
      <div class="text-gray-600 align-self-center">
        {{ lastRecord.date }}
      </div>
      <div class="text-gray-600 align-self-center font-weight-bold pa-4">
        {{ lastRecord.name }}
      </div>
      <div v-if="!lastRecord.finished" class="ml-auto align-self-center" tile>
        <v-icon :icon="Icons.Pencil" />
      </div>
    </div>
    <div class="px-2">
      <v-divider color="gray-200" />
      <div class="py-5 d-flex justify-space-between align-center">
        <overview-button />
        <submit-primary-light :icon="Icons.Plus" :label="t('submit.types.new')" />
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { Icons } from "../services/icons"
import RecordProgress from "./RecordProgress.vue"
import { useI18n } from "vue-i18n"
import { ProgressBarInfo } from "../api/types"
import { DateTime } from "luxon"
import OverviewButton from "./common/button/OverviewButton.vue"
import SubmitPrimaryLight from "./common/button/SubmitPrimaryLight.vue"

export default defineComponent({
  components: { SubmitPrimaryLight, OverviewButton, RecordProgress },

  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    icon: {
      type: String as PropType<keyof typeof Icons>,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
    stats: {
      type: Object as PropType<{
        last: ProgressBarInfo
        current: ProgressBarInfo
      }>,
      default: null,
    },
    lastRecord: {
      type: Object,
      default: null,
    },
  },

  setup(props) {
    const { t } = useI18n()
    const datetime = DateTime.now()

    const statsWithTitle = computed(() => {
      return {
        last: {
          ...props.stats.last,
          title: datetime.plus({ month: -1 }).monthLong,
          isActive: false,
        },
        current: {
          ...props.stats.current,
          title: datetime.monthLong,
          isActive: true,
        },
      }
    })

    return {
      Icons,
      t,
      statsWithTitle,
    }
  },
})
</script>
