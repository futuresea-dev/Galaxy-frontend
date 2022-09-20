<template>
  <div class="d-flex items-center justify-end" :class="tonal && !stat.isActive ? 'opacity-50' : ''">
    <div
      class="text-body-2 font-stretch-condensed font-weight-bold mr-4 text-capitalize"
      :class="tonal ? 'text-white' : stat.isActive ? 'text-gray-600' : 'text-gray-300'"
    >
      {{ stat.title }}
    </div>
    <div class="ProgressWrapper py-1 pr-4" :class="tonal ? 'ProgressWrapper--tonal' : 'bg-background'">
      <div class="Progress" :class="tonal ? 'Progress--tonal' : ''">
        <div
          :class="`ProgressBar bg-${stat.isActive ? progressColor : 'gray-300'}`"
          :style="`width: ${progressPercent}%`"
        />
      </div>
    </div>
    <div class="text-body-2 font-stretch-condensed font-weight-bold ml-4">
      <span :class="`text-${stat.isActive ? progressColor : tonal ? 'white' : 'gray-300'}`">
        {{ stat.recordsCount }}
      </span>
      <span :class="stat.isActive ? 'text-success' : tonal ? 'text-white' : 'text-gray-300'">
        /{{ stat.recordsGoal }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue"
import { ProgressBarInfo } from "../api/types"

export default defineComponent({
  props: {
    stat: {
      type: Object as PropType<ProgressBarInfo & { title: string; isActive: boolean }>,
      required: true,
    },
    tonal: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const progressPercent = computed(() => {
      const percent = Math.round((props.stat.recordsCount / props.stat.recordsGoal) * 100)

      if (percent < 0) return 0
      if (percent > 100) return 100

      return percent
    })
    const progressColor = computed(() => (progressPercent.value >= 100 ? "success" : props.tonal ? "primary" : "brown"))

    return {
      progressPercent,
      progressColor,
    }
  },
})
</script>

<style lang="scss" scoped>
.ProgressWrapper {
  @media (max-width: 1200px) {
    flex: 1;
  }

  &--tonal {
    background: rgb(var(--v-theme-purple));
  }
}
.Progress {
  width: 12rem;
  border: 2px solid #fff;
  background: #fff;
  &--tonal {
    background: #4d555b;
    border: 2px solid rgb(var(--v-theme-purple));
  }

  @media (max-width: 1200px) {
    width: 100%;
  }
}
.ProgressBar {
  height: 0.7rem;
}
</style>
