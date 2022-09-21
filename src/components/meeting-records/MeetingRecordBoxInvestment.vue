<template>
  <div>
    <MeetingRecordBox
      v-if="recordBoxStore"
      :title="t('cards.titles.investment')"
      image="meeting-records-bg/meeting-record-investment.svg"
      icon="ChartCandlestick"
      :prefix="t('cards.descriptions.prefix')"
      :description="t('cards.descriptions.investment')"
      :stats="recordBoxStore.investment"
      :last-record="recordBoxStore.lastRecordInvestment"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import MeetingRecordBox from "../../components/MeetingRecordBox.vue"
import { useRecordBoxStore } from "../../store/recordBox"

export default defineComponent({
  components: { MeetingRecordBox },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const recordBoxStore = useRecordBoxStore()
    return {
      t,
      recordBoxStore,
    }
  },
})
</script>
