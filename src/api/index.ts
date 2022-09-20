import { SignInRequest } from "./types"
import { RequestConfig } from "../requestor/setting"

type ApiDefinition = {
  signIn: (data: SignInRequest) => RequestConfig
  signOut: () => RequestConfig
  refresh: () => RequestConfig
  user: () => RequestConfig
  userRecordProgress: (userId: number, months: Array<{ year: number; month: number }>) => RequestConfig
  contactFindByName: (query: string) => RequestConfig
  getCountryFlags: (query: string) => RequestConfig
  suggestion: (street: string) => RequestConfig
  lastRecords: (userId: number) => RequestConfig
}

export enum RequestId {
  signIn = "signIn",
  signOut = "signOut",
  refresh = "refresh",
  autoRefresh = "autoRefresh",
  user = "user",
  userRecordProgress = "userRecordProgress",
  contactFindByName = "contactFindByName",
  suggestion = "suggestion",
  getCountyFlags = "getCountyFlags",
  lastRecords = "lastRecords",
}

export const requestIdConfig: Record<RequestId, number> = {
  [RequestId.signIn]: 2,
  [RequestId.signOut]: 1,
  [RequestId.refresh]: 2,
  [RequestId.autoRefresh]: 1,
  [RequestId.user]: 1,
  [RequestId.userRecordProgress]: 1,
  [RequestId.contactFindByName]: 1,
  [RequestId.suggestion]: 1,
  [RequestId.getCountyFlags]: 1,
  [RequestId.lastRecords]: 1,
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export const apiRoutes: Record<keyof ApiDefinition, (...args: any) => string> = {
  signIn: () => "/login/sign-in",
  signOut: () => "/login/sign-out",
  refresh: () => "/login/refresh-token",
  user: () => "/user/info",
  userRecordProgress: () => "/user/record-progress",
  contactFindByName: (query: string) => `/contact/find/by-name/${query}`,
  suggestion: () => `/suggestion/address/street`,
  getCountryFlags: () => `/suggestion/address/country`,
  lastRecords: (userId: number) => `/user/last-records/${userId}`,
}

export const api: ApiDefinition = {
  signIn: (data) => ({
    url: apiRoutes.signIn(),
    method: "POST",
    data,
  }),
  signOut: () => ({
    url: apiRoutes.signOut(),
    method: "GET",
  }),
  refresh: () => ({
    url: apiRoutes.refresh(),
    method: "POST",
  }),
  user: () => ({
    url: apiRoutes.user(),
    method: "GET",
  }),
  userRecordProgress: (userId, months) => ({
    url: apiRoutes.userRecordProgress(),
    method: "POST",
    params: {
      userId: userId,
      months: months,
    },
  }),
  contactFindByName: (query) => ({
    url: apiRoutes.contactFindByName(query),
    method: "GET",
  }),
  suggestion: (street) => ({
    url: apiRoutes.suggestion(),
    method: "GET",
    params: {
      street,
      includeStreetNumber: true,
      limit: 5,
    },
  }),
  getCountryFlags: (query) => ({
    url: apiRoutes.getCountryFlags(),
    method: "GET",
    params: {
      query,
      limit: 5,
    },
  }),
  lastRecords: (userId) => ({
    url: apiRoutes.lastRecords(userId),
    method: "GET",
  }),
}
