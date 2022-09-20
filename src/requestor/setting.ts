import { AxiosRequestConfig } from "axios"

export type ClientId = "default" | "users" | "posts"

export type RequestConfig = {
  clientId?: ClientId
} & Pick<AxiosRequestConfig, "url" | "method" | "headers">
