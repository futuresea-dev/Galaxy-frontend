import { defineStore } from "pinia"
import { RefreshTokenResponse, SignInRequest, SignInResponse, UserResponse } from "../api/types"
import { api, RequestId } from "../api"
import { setToken } from "../services/accessToken"
import { useRequest } from "../requestor"

type State = {
  userId: number
  firstName: string
  lastName: string
  email: string
  img: string
}

type Getter = {
  initials: () => string
  fullName: () => string
  isLogged: () => boolean
}

type Actions = {
  signIn: (username: string, password: string) => Promise<boolean>
  getUser: (id: RequestId) => Promise<boolean>
  refreshToken: () => Promise<boolean>
}

let interval: number | null = null
const autoRefreshToken = (timeout: number) => {
  if (interval) {
    window.clearInterval(interval)
  } else {
    interval = window.setInterval(async () => {
      const { execute } = useRequest()

      await execute(api.refresh(), RequestId.autoRefresh, { showError: false })
    }, timeout * 60 * 1000)
  }
}

export const useUserStore = defineStore<string, State, Getter, Actions>("user", {
  state: () => ({
    userId: 0,
    firstName: "Petr",
    lastName: "Volný",
    email: "petr.volny@smsfinance.cz",
    img: "https://breakingpoint.gg/wp-content/uploads/2022/01/user.png",
  }),
  getters: {
    initials() {
      return `${this.firstName.at(0)}${this.lastName.at(0)}`
    },
    fullName() {
      return `${this.firstName} ${this.lastName}`
    },
    isLogged() {
      return this.email !== "" && this.userId !== 0
    },
  },
  actions: {
    async signIn(username: string, password: string) {
      const { result, execute } = useRequest<SignInResponse, SignInRequest>()

      if ((await execute(api.signIn({ username, password }), RequestId.signIn, { forceReset: true })) && result.value) {
        setToken(result.value.accessToken || "")
        autoRefreshToken(result.value.expirationMinutes || 10)

        await this.getUser(RequestId.signIn)

        return true
      }

      return false
    },
    async getUser(requestId: string) {
      const { result, execute } = useRequest<UserResponse>()

      if ((await execute(api.user(), requestId)) && result.value) {
        this.firstName = result.value.firstName || ""
        this.lastName = result.value.lastName || ""
        this.email = result.value.companyEmail || ""
        this.userId = result.value.userId || 0
        this.img = result.value.img || ""

        return true
      }

      return false
    },
    async refreshToken() {
      const { result, execute } = useRequest<RefreshTokenResponse>()

      if ((await execute(api.refresh(), RequestId.refresh, { forceReset: true })) && result.value) {
        setToken(result.value.accessToken || "")
        autoRefreshToken(result.value.expirationMinutes || 10)

        await this.getUser(RequestId.refresh)

        return true
      }

      return false
    },
  },
})
