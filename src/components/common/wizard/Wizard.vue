<template>
  <form @submit="onNext">
    <v-card>
      <v-card-title> {{ currentStep }} - {{ maxStep }} </v-card-title>
      <v-card-text>
        <slot :name="`step-${currentStep}`" :values="values" />
      </v-card-text>
      <v-card-actions>
        <slot name="overview" />
        <v-spacer></v-spacer>
        <v-btn v-if="!isFirst" @click="onPrev">PREV</v-btn>
        <v-btn type="submit">{{ isLast ? "SUBMIT" : "NEXT" }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-slide-group :model-value="currentStep" center-active show-arrows>
      <v-slide-group-item
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ isSelected }"
        :disabled="index > maxStep"
      >
        <v-btn
          id="xxx"
          class="ma-2"
          rounded
          :color="isSelected ? 'primary' : index < maxStep ? 'secondary' : 'blue'"
          @click="onClickNav(index)"
        >
          Options {{ item.title }} {{ index }} {{ index > maxStep }}
        </v-btn>
      </v-slide-group-item>
    </v-slide-group>
    <pre>
      {{ values }}
    </pre>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue"
import { useForm } from "vee-validate"

export default defineComponent({
  props: {
    validationSchema: {
      type: Array,
      required: true,
    },
    items: {
      type: Array as PropType<Array<{ title: string }>>,
      required: true,
    },
  },
  emits: ["submit"],
  setup(props, { emit }) {
    const currentStep = ref(0)
    const maxStep = ref(0)
    const hop = ref(1)

    const currentSchema = computed(() => {
      return props.validationSchema[currentStep.value]
    })

    const { values, handleSubmit } = useForm({
      validationSchema: currentSchema,
      keepValuesOnUnmount: true,
    })

    const onPrev = () => {
      let prev = currentStep.value - hop.value

      if (prev <= 0) {
        prev = 0
      }

      currentStep.value = prev
    }

    const onNext = handleSubmit((values) => {
      let next = currentStep.value + hop.value

      if (next >= props.validationSchema.length - 1) {
        next = props.validationSchema.length - 1
      }

      if (isLast.value) {
        emit("submit", values)
      }

      currentStep.value = next
      maxStep.value = Math.max(next, maxStep.value)
    })

    const isLast = computed(() => {
      return props.validationSchema.length - 1 === currentStep.value
    })

    const isFirst = computed(() => {
      return 0 === currentStep.value
    })

    const onClickNav = (index: number) => {
      if (index > maxStep.value) {
        return
      }

      const x = currentStep.value - index

      hop.value = x <= 0 ? 1 : x

      if (currentStep.value < index) {
        onNext()
      } else {
        onPrev()
      }

      console.log(index)
    }

    return {
      onPrev,
      onNext,
      currentStep,
      isLast,
      isFirst,
      values,
      onClickNav,
      maxStep,
    }
  },
})
</script>
