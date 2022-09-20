<template>
  <div>
    <MeetingRecordBox
      v-if="recordBoxStore"
      :title="t('cards.titles.pension')"
      image="meeting-records-bg/meeting-record-pension.svg"
      icon="PersonWalkingWithCane"
      :prefix="t('cards.descriptions.prefix')"
      :description="t('cards.descriptions.pension')"
      :stats="recordBoxStore.pension"
      :last-record="recordBoxStore.lastRecordPension"
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
    const { t } = useI18n()
    const recordBoxStore = useRecordBoxStore()
    return {
      t,
      recordBoxStore,
    }
  },
})
</script>
