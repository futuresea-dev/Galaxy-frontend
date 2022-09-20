<template>
  <v-card class="OpeningRecordBox d-flex" elevation="4">
    <div v-if="image" class="w-50 mr-1">
      <v-img :src="image" :alt="title" class="h-100" cover />
    </div>
    <div class="d-flex flex-column justify-space-between" :class="image ? 'w-50' : 'w-100'">
      <div class="d-flex align-center text-white mb-6 pt-3">
        <v-icon v-if="icon" :icon="Icons[icon]" large class="mx-5" />
        <div>
          <h3 class="text-h6 font-weight-bold font-stretch-condensed">
            {{ title }}
          </h3>
          {{ prefix }} <span>&#8226;</span> {{ description }}
        </div>
      </div>
      <div>
        <div class="px-2">
          <div class="text-uppercase text-gray-200 font-weight-bold text-right px-2">{{ t("cards.titles.stats") }}</div>
          <v-divider color="gray-200" />
        </div>
        <div v-if="stats" class="px-2 mb-8">
          <RecordProgress :stat="statsWithTitle.last" class="my-3" tonal />
          <RecordProgress :stat="statsWithTitle.current" class="my-3" tonal />
        </div>
        <div class="px-2">
          <div class="text-uppercase text-gray-200 font-weight-bold text-right px-2">
            {{ t("cards.titles.history") }}
          </div>
          <v-divider color="gray-200" />
        </div>
        <div v-if="lastRecord" class="LastRecord mx-2 px-2 py-4 d-flex align-center">
          <div class="px-4">
            <v-icon :icon="Icons.Lock" class="text-white" x-small />
          </div>
          <div class="text-white">
            {{ lastRecord.name }}
          </div>
          <div class="text-white flex-grow-1 text-center">
            {{ lastRecord.date }}
          </div>
          <div class="text-white">
            <v-icon :icon="Icons.Pencil" class="text-white" x-small />
          </div>
        </div>
        <v-divider color="gray-200" class="mb-8 mx-2" />
        <div class="px-2">
          <v-divider color="gray-200" />
          <div class="py-5 d-flex justify-space-between align-center">
            <OverviewButton text="text-white" />
            <SubmitPrimaryDark :icon="Icons.Plus" :label="t('submit.types.new')" />
          </div>
        </div>
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
import SubmitPrimaryDark from "./common/button/SubmitPrimaryDark.vue"
import OverviewButton from "./common/button/OverviewButton.vue"

export default defineComponent({
  components: { OverviewButton, SubmitPrimaryDark, RecordProgress },

  props: {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
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

<style lang="scss" scoped>
.OpeningRecordBox {
  background-image: linear-gradient(135deg, #a22c32 0%, #562cde 100%);
  max-height: 410px;
}
.LastRecord {
  background: rgba(191, 195, 198, 0.2);
}
</style>
