import axios from "axios"
import { config } from "../config/config"

const client = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
})

export { client }
