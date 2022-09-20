let AccessToken: string | null = null

export const getToken = (): string | null => {
  return AccessToken
}

export const setToken = (token: string) => {
  AccessToken = token
}
