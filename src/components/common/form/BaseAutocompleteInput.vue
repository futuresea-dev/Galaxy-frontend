<template>
  <v-autocomplete
    ref="el"
    v-model="innerValue"
    :items="items"
    :label="label"
    :name="name"
    :error-messages="errorMessage"
    :placeholder="placeholder"
    :loading="loading"
    :density="density"
    @update:search="onSearch"
    @focus.once="$emit('search', '')"
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-autocomplete>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import BaseInput from "./BaseInput.vue"
import { useField } from "vee-validate"

export default defineComponent({
  extends: BaseInput,
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["search", "initSearch"],
  setup(props, { emit }) {
    const el = ref()
    const innerValue = ref<{ title: string; value: string }>()
    const { value, errorMessage, setValue } = useField<string>(props.name)

    // todo add support for return-object, disable search on click if item selected
    if (value.value && props.items?.length === 0) {
      emit("initSearch", value.value)
      innerValue.value = { title: value.value, value: value.value }
    }

    let timeout: number | null = null
    const onSearch = async (val: string) => {
      if (val && innerValue.value) {
        if (val === innerValue.value?.title) {
          return
        }
      }

      if (timeout) {
        clearTimeout(timeout)
      }

      if (!val) {
        return
      }

      timeout = window.setTimeout(async () => {
        emit("search", val)
      }, 300)
    }

    watch(
      () => innerValue.value,
      (val) => {
        if (val) {
          setValue(val.value || "")

          if (el.value) {
            const input = el.value.$el.querySelector("input")
            input.blur()
          }
        }
      },
    )

    return {
      errorMessage,
      value,
      innerValue,
      onSearch,
      el,
    }
  },
})
</script>
