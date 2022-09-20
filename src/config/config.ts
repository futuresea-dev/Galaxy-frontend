const createConfig = () => {
  const env = import.meta.env

  const isDev = env.DEV

  return {
    apiUrl: isDev ? env.VITE_API_URL : window.appConfig.apiUrl,
    enableMock: isDev ? env.VITE_ENABLE_MOCK === "true" : window.appConfig.enableMock === "true",
  }
}

export const config = createConfig()
