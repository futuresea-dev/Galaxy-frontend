import { defineStore } from "pinia"

type Notification = {
  id: string
  type: "info" | "error" | "warning"
  message: string
}

type State = {
  items: Notification[]
}

type Actions = {
  add: (item: Notification) => void
  remove: (id: string) => void
}

export const useNotificationStore = defineStore<string, State, {}, Actions>("notifications", {
  state: () => ({
    items: [],
  }),
  actions: {
    add(item) {
      this.items.push(item)
    },
    remove(id) {
      const index = this.items.findIndex((item) => item.id === id)
      this.items.splice(index, 1)
    },
  },
})
