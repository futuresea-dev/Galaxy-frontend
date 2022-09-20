<template>
  <div class="ma-6">
    {{ $route.fullPath }}

    <v-row>
      <v-col cols="6">
        <ArticleBox :article="article" />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { RequestId } from "../../api"
import { useRequestLoading } from "../../requestor"
import ArticleBox from "../../components/ArticleBox.vue"
import { useI18n } from "vue-i18n"

export default defineComponent({
  components: { ArticleBox },
  setup() {
    const { t } = useI18n()
    return {
      t,
      loading: useRequestLoading(RequestId.contactFindByName),
      article: {
        image: "https://picsum.photos/279/289",
        title: "Opravy záznamů životního pojištění",
        tags: ["Záznam z jednání", "Život"],
        state: "Novinka",
        description:
          "Od minulého pátku lze nově editovat a opravovat již uzavřené záznamy z jednání pro sjednání pojištění osob (Život). prozatím lze upravovat část ...",
        date: "2022-07-10",
      },
    }
  },
})
</script>
