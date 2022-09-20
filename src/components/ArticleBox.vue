<template>
  <v-card class="ArticleBox">
    <div class="d-flex" :class="mdAndUp ? '' : 'flex-column'">
      <div class="ArticleBox__Image" :class="mdAndUp ? 'is-md' : ''">
        <v-img :src="article.image" :alt="article.title" width="289" height="279" cover />
      </div>
      <div class="px-4 d-flex flex-column justify-space-between">
        <div>
          <h2 class="ArticleBox__Title pt-3">
            {{ article.title }}
          </h2>
          <div class="mb-3 text-gray-300">
            {{ article.tags.join(" • ") }}
          </div>
          <div class="mb-3">
            <v-chip color="success">
              {{ article.state }}
            </v-chip>
          </div>
          <div class="mb-2">
            {{ article.description }}
          </div>
        </div>
        <div>
          <v-divider color="#bbcdd9" />
          <div class="d-flex justify-space-between py-4 text-gray-300">
            <span> Váš SMS IT tým </span>
            <div>
              {{ DateTime.fromISO(article.date).toLocaleString(DateTime.DATE_SHORT) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { useDisplay } from "vuetify"
import { defineComponent } from "vue"
import { DateTime } from "luxon"

export default defineComponent({
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { mdAndUp } = useDisplay()
    return {
      DateTime,
      mdAndUp,
    }
  },
})
</script>

<style lang="scss" scoped>
.ArticleBox {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.13), 0px 1px 10px rgba(0, 0, 0, 0.12);

  &:hover {
    box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.13),
      0px 6px 30px 5px rgba(0, 0, 0, 0.12);
  }

  &__Image.is-md {
    max-width: 38%;
  }
  &__Title {
    font-stretch: 75%;
  }
}
</style>
