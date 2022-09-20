export const convertToInt = (val: number | string | null | undefined): number => {
  if (!val) {
    return 0
  }

  if (typeof val === "string") {
    val = val.replaceAll(/\s/g, "")

    if (val.length > Number.MAX_SAFE_INTEGER.toString().length) {
      window.console.warn(`The number [${val}] is bigger then safe integer.`)
    }

    return parseInt(val, 10)
  }

  return val
}

export const convertToString = (val: number | bigint | string | null | undefined): string => {
  if (!val) {
    return ""
  }

  if (typeof val === "number" || typeof val === "bigint") {
    return val.toString()
  }

  return val
}
