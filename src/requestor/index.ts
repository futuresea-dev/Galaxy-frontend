import { computed, reactive, ref, unref } from "vue"
import { AxiosInstance, AxiosRequestConfig } from "axios"
import { ClientId } from "./setting"

/* eslint-disable  @typescript-eslint/no-explicit-any */
type ClientConfig = {
  client: AxiosInstance
  beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig
  afterRequest?: () => void
  onError?: (e: any, requestOptions: RequestOptions) => void
}

const apiClients = new Map<string, ClientConfig>()
let requestIdsConfig: Record<string, number> = {}

export const defineApiClient = (id: ClientId, clientConfig: ClientConfig) => {
  apiClients.set(id, clientConfig)
}

export const defineRequestIdConfig = (config: Record<string, number>) => {
  requestIdsConfig = config
}

export const dynamicId = (requestId: string, id: string) => {
  return `${requestId}-${id}`
}

type RequestState = {
  counter: number
  count: number
  loading: boolean
  isError: boolean
  errors: string[]
}

export type RequestOptions = {
  throwError?: boolean
  showError?: boolean
  forceReset?: boolean
}

const store = reactive<Map<string, RequestState>>(new Map())

const getRequestState = (requestId: string): RequestState => {
  if (!store.has(requestId)) {
    store.set(requestId, {
      counter: 0,
      count: requestIdsConfig[requestId] || 1,
      loading: false,
      isError: false,
      errors: [],
    })
  }

  return store.get(requestId) as RequestState
}

const startLoading = (requestId: string, forceReset: boolean) => {
  const state = getRequestState(requestId)

  const count = requestIdsConfig[requestId] || 1

  if (state.counter >= count * 2 || (forceReset && state.counter > 0)) {
    state.counter = 0
    state.errors = []
    state.isError = false
  }

  state.loading = true
  state.count = count
  state.counter++
}

const stopLoading = (requestId: string) => {
  const state = getRequestState(requestId)

  state.counter++
  if (state.counter >= state.count * 2) {
    state.loading = false
  }
}

const addError = (requestId: string, error: string) => {
  const state = getRequestState(requestId)

  state.loading = false
  state.isError = true
  state.errors.push(error)
}

// state function
export const useRequestState = (requestId: string, id?: string) => {
  return computed<RequestState>(() => {
    if (id) {
      return getRequestState(dynamicId(requestId, id))
    }

    return getRequestState(requestId)
  })
}

export const useRequestLoading = (requestId: string, id?: string) => {
  return computed<boolean>(() => {
    if (id) {
      return getRequestState(dynamicId(requestId, id)).loading
    }

    return getRequestState(requestId).loading
  })
}

export const useRequestLoadingUnRef = (requestId: string, id?: string) => {
  return unref(useRequestLoading(requestId, id))
}

export const useRequest = <ResponseType, RequestData = any>(clientId = "default") => {
  const result = ref<ResponseType>()

  const apiClient = apiClients.get(clientId)

  if (!apiClient) {
    throw Error(`Api client id="${clientId}" does not exist.`)
  }

  const execute = async (
    config: AxiosRequestConfig<RequestData>,
    requestId: string,
    options?: RequestOptions,
  ): Promise<boolean> => {
    let requestOptions: RequestOptions = {
      throwError: false,
      showError: true,
      forceReset: false,
    }

    if (options) {
      requestOptions = { ...requestOptions, ...options }
    }

    if (apiClient.beforeRequest) {
      config = apiClient.beforeRequest(config)
    }

    try {
      startLoading(requestId, requestOptions.forceReset || false)

      const data = await apiClient.client.request<ResponseType>(config)

      result.value = data.data

      return true
    } catch (e: any) {
      if (apiClient.onError) {
        apiClient.onError(e, requestOptions)
      } else {
        window.console.error(e)
      }

      addError(requestId, e.message)

      if (requestOptions.throwError) {
        throw e
      }

      return false
    } finally {
      if (apiClient.afterRequest) {
        apiClient.afterRequest()
      }
      stopLoading(requestId)
    }
  }

  return {
    result,
    execute,
  }
}
