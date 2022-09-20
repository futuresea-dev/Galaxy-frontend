import { env } from "../config/env"

export const UIRoutes = {
  signIn: () => `sign-in`, // todo maybe use createFullUrl here
}

export const createFullUrl = (path = "") => {
  if (path === "") {
    return `${env.baseUrl}/`
  }

  return `${env.baseUrl}/${path}`
}
