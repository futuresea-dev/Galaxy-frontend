import dotenv from "dotenv"
import path from "path"

export const env: { baseUrl: string; username: string; password: string } = {
  baseUrl: "",
  username: "",
  password: "",
}

const init = () => {
  dotenv.config({ path: path.resolve(__dirname, "../../.env.playwright") })

  const requiredEnv = ["UI_URL", "USERNAME", "PASSWORD"]

  requiredEnv.forEach((item) => {
    if (!process.env[item]) {
      throw new Error(`The env ${item} is required.`)
    }
  })

  env.baseUrl = process.env.UI_URL || ""
  env.username = process.env.USERNAME || ""
  env.password = process.env.PASSWORD || ""

  return env
}

export default init()
