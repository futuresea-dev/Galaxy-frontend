<template>
  <div class="ma-6">
    <div>{{ $route.fullPath }}</div>
    <v-row>
      <v-col cols="4">
        <meeting-record-box-investment />
      </v-col>
      <v-col cols="4">
        <meeting-record-box-person />
      </v-col>
      <v-col cols="4">
        <meeting-record-box-property />
      </v-col>
      <v-col cols="4">
        <meeting-record-box-vehicle />
      </v-col>
      <v-col cols="4">
        <meeting-record-box-pension />
      </v-col>
      <v-col cols="4">
        <meeting-record-box-loan />
      </v-col>
      <v-col cols="4">
        <meeting-record-box-industry />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "vue-i18n"
import { useRecordBoxStore } from "../../store/recordBox"
import MeetingRecordBoxInvestment from "../../components/meeting-records/MeetingRecordBoxInvestment.vue"
import MeetingRecordBoxPerson from "../../components/meeting-records/MeetingRecordBoxPerson.vue"
import MeetingRecordBoxProperty from "../../components/meeting-records/MeetingRecordBoxProperty.vue"
import MeetingRecordBoxVehicle from "../../components/meeting-records/MeetingRecordBoxVehicle.vue"
import MeetingRecordBoxPension from "../../components/meeting-records/MeetingRecordBoxPension.vue"
import MeetingRecordBoxLoan from "../../components/meeting-records/MeetingRecordBoxLoan.vue"
import MeetingRecordBoxIndustry from "../../components/meeting-records/MeetingRecordBoxIndustry.vue"

export default defineComponent({
  components: {
    MeetingRecordBoxIndustry,
    MeetingRecordBoxLoan,
    MeetingRecordBoxPension,
    MeetingRecordBoxVehicle,
    MeetingRecordBoxProperty,
    MeetingRecordBoxPerson,
    MeetingRecordBoxInvestment,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const recordBoxStore = useRecordBoxStore()
    recordBoxStore.fill()
    return {
      t,
      recordBoxStore,
    }
  },
})
</script>
