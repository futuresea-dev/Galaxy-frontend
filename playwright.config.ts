import { PlaywrightTestConfig } from "@playwright/test"
import { env } from "./tests-e2e/config/env"

const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./tests-e2e/config/global-setup'),
  use: {
    baseURL: env.baseUrl,
    storageState: `tests-e2e/storage/loginState.json`,
  },
}

export default config
