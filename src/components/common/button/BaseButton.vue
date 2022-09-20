<template>
  <v-btn
    :type="type"
    :disabled="loading"
    :color="color"
    :variant="variant"
    :data-test="dataTest"
    :flat="flat"
    rounded="pill"
    :class="text"
  >
    <v-progress-circular v-if="loading" size="20" indeterminate class="mr-2" />
    <v-icon v-else-if="icon" left :icon="icon" class="mr-2" />
    {{ label }}
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import DataTestAttribute from "../test/DataTestAttribute.vue"

export default defineComponent({
  extends: DataTestAttribute,
  props: {
    icon: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    flat: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String as PropType<"button" | "submit">,
      default: "button",
    },
    color: {
      type: String as PropType<"primary" | "white" | "none">,
      default: "none",
    },
    variant: {
      type: String as PropType<"elevated">,
      default: "elevated",
    },
    text: {
      type: String as PropType<"text-white" | "text-purple" | "text-gray">,
      default: null,
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-primary {
  background: linear-gradient(135deg, #a22c32 0%, #562cde 100%) !important;
  color: #fff;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: 600;
  box-shadow: 0px 2px 4px -1px rgba(156, 39, 176, 0.2), 0px 5px 4px rgba(156, 39, 176, 0.13),
    0px 1px 10px rgba(156, 39, 176, 0.12);

  &:hover {
    box-shadow: 0px 5px 6px -3px rgba(156, 39, 176, 0.2), 0px 9px 12px 1px rgba(156, 39, 176, 0.13),
      0px 3px 16px 2px rgba(156, 39, 176, 0.12);
  }
}

.v-btn.bg-none {
  background: none;
}

.v-btn:not(.v-btn--flat) {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 5px 4px rgba(0, 0, 0, 0.13), 0px 1px 10px rgba(0, 0, 0, 0.12);
}
</style>
