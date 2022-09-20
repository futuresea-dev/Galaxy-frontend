<template>
  <text-input :label="tStepEconomicActivities('clientBusiness.label')" name="clientBusiness" />
  <text-input :label="tStepEconomicActivities('idNumber.label')" name="ico" />
  <text-input :label="tStepEconomicActivities('position.label')" name="position" />
  <radio-input name="isPep" label="isPep" :items="yesOrNoList" title="stepEconomicActivities.pep.label" />
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useYesOrNoList, YesOrNo } from "../helpers/yesOrNo"
import TextInput from "../common/form/TextInput.vue"
import RadioInput from "../common/form/RadioInput.vue"
import { icValidator } from "../../services/validator"
import { string } from "yup"
import { tStepEconomicActivities } from "../../plugins/i18n"

export type EconomicActivitiesTypes = {
  clientBusiness: string
  ico: number
  position: string
  isPep: YesOrNo
}

export const initialValuesEconomicActivities = (data?: EconomicActivitiesTypes): EconomicActivitiesTypes => {
  return {
    clientBusiness: data?.clientBusiness || "Petr Volný",
    ico: 81852002,
    position: "CEO",
    isPep: "no",
  }
}

export const useValidationSchemaEconomicActivities = () => {
  return {
    clientBusiness: string().required().label(tStepEconomicActivities("clientBusiness.name")),
    ico: icValidator(),
    position: string().required().label(tStepEconomicActivities("position.name")),
    isPep: string().required().label(tStepEconomicActivities("pep.name")),
  }
}

export default defineComponent({
  components: {
    TextInput,
    RadioInput,
  },
  setup() {
    return {
      yesOrNoList: useYesOrNoList(),
      tStepEconomicActivities,
    }
  },
})
</script>
