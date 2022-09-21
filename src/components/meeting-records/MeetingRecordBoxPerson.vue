<template>
  <div>
    <MeetingRecordBox
      v-if="recordBoxStore"
      :title="t('cards.titles.persons')"
      image="meeting-records-bg/meeting-record-person.svg"
      icon="HeartPulse"
      :prefix="t('cards.descriptions.prefix')"
      :description="t('cards.descriptions.persons')"
      :stats="recordBoxStore.person"
      :last-record="recordBoxStore.lastRecordPerson"
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
