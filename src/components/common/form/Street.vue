<template>
  <text-input :label="t('address.street.label')" name="street" type="text" @update:model-value="onChange" />
  <ul>
    <li v-for="item in items" :key="item.street">
      {{ item.streetWithNumber }} <v-btn variant="text" @click="$emit('suggestion', item)">Select</v-btn>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import TextInput from "./TextInput.vue"
import { useI18n } from "vue-i18n"
import { useRequest } from "../../../requestor"
import { api, RequestId } from "../../../api"

export type SuggestionItem = {
  street: string
  streetWithNumber: string
  streetNumber: string
  postalCode: string
  city: string
}

export default defineComponent({
  components: { TextInput },
  emits: ["suggestion"],
  setup() {
    const items = ref<SuggestionItem[]>([])

    const { execute, result } = useRequest<{ suggestions: SuggestionItem[] }>()
    let timeout: number | null = null

    const onChange = (value: string) => {
      if (timeout) {
        clearTimeout(timeout)
      }

      timeout = window.setTimeout(async () => {
        await execute(api.suggestion(value), RequestId.suggestion)

        items.value = result.value ? result.value["suggestions"] : []
      }, 300)
    }

    const { t } = useI18n({ useScope: 'global' })
    return {
      onChange,
      t,
      items,
    }
  },
})
</script>
