import { expect, it, describe, beforeEach } from "vitest"
import { setActivePinia, createPinia } from "pinia"
import { useNotificationStore } from "../../src/store/notifications"

describe("Request state store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it("", () => {
    const notificationStore = useNotificationStore()

    expect(notificationStore.items.length).toBe(0)
    notificationStore.add({ id: "1", type: "info", message: "message" })
    expect(notificationStore.items.length).toBe(1)
    expect(notificationStore.items[0]).toEqual({ id: "1", type: "info", message: "message" })
    notificationStore.remove("1")
    expect(notificationStore.items.length).toBe(0)
  })
})
