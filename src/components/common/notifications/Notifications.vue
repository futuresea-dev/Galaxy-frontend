<template>
  <v-snackbar v-model="show" right bottom :timeout="-1">
    <v-alert v-for="item in items" :key="item.id" :type="item.type">
      {{ item.message }}
      <template #append>
        <v-btn :icon="Icons.Close" variant="text" density="compact" @click="onClose(item.id)" />
      </template>
    </v-alert>
  </v-snackbar>
</template>

<script lang="ts">
import { useNotificationStore } from "../../../store/notifications"
import { storeToRefs } from "pinia"
import { Icons } from "../../../services/icons"
import { defineComponent, ref, watch } from "vue"

export default defineComponent({
  setup() {
    const notificationStore = useNotificationStore()

    const onClose = (id: string) => {
      notificationStore.remove(id)
    }
    const { items } = storeToRefs(notificationStore)

    const show = ref(false)

    watch(
      items.value,
      () => {
        show.value = items.value.length > 0
      },
      { deep: true },
    )

    return {
      onClose,
      items,
      Icons,
      show,
    }
  },
})
</script>
