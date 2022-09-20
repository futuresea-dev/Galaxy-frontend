<template>
  <BaseAutocompleteInput
    :items="countries"
    :label="label"
    :name="name"
    :placeholder="placeholder"
    :loading="loading"
    @search="onSearch"
    @init-search="onInitSearch"
  >
    <template #selection="{ item }">
      <ImageBase64 :encoded-image="item.raw.flag" style="width: 18px" /> &nbsp; {{ item.raw.title }}
    </template>
    <template #item="{ props, item }">
      <v-list-item v-bind="props" title="">
        <div class="d-flex align-center">
          <div style="width: 20px">
            <ImageBase64 :encoded-image="item.raw.flag" />
          </div>
          &nbsp; {{ item.raw.title }}
        </div>
      </v-list-item>
    </template>
  </BaseAutocompleteInput>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import ImageBase64 from "../../ImageBase64.vue"
import BaseAutocompleteInput from "./BaseAutocompleteInput.vue"
import { useRequest, useRequestLoading } from "../../../requestor"
import { CountryFlagsResponse } from "../../../api/types"
import { api, RequestId } from "../../../api"

export default defineComponent({
  components: { ImageBase64, BaseAutocompleteInput },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup() {
    const countries = ref<Array<{ title: string; value: string; flag: string }>>()
    const { execute, result } = useRequest<CountryFlagsResponse>()

    const onInitSearch = async (val: string) => {
      if ((await execute(api.getCountryFlags(val), RequestId.getCountyFlags)) && result.value) {
        countries.value =
          result.value?.suggestions.map((item) => ({ title: item.name, value: item.name, flag: item.flag })) || []
      }
    }

    const onSearch = async (val: string) => {
      if ((await execute(api.getCountryFlags(val), RequestId.getCountyFlags)) && result.value) {
        countries.value =
          result.value?.suggestions.map((item) => ({ title: item.name, value: item.name, flag: item.flag })) || []
      }
    }

    return {
      onSearch,
      onInitSearch,
      countries,
      loading: useRequestLoading(RequestId.getCountyFlags),
    }
  },
})
</script>
