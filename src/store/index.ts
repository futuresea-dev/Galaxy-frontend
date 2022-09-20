import { useMainStore } from "./main"
import { useNotificationStore } from "./notifications"
import { useUserStore } from "./user"

export const clearStore = () => {
  useMainStore().$reset()
  useNotificationStore().$reset()
  useUserStore().$reset()
}
