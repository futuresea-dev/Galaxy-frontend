import { expect, it, describe, vi, afterEach } from "vitest"
import { defineApiClient, defineRequestIdConfig, useRequest, useRequestState } from "../../src/requestor"
import axios, { AxiosError } from "axios"

const client = axios.create()

describe("useRequest", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("call api", async () => {
    defineApiClient("default", { client })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementation(async () => ({ data: { id: 1 } }))

    const { execute, result } = useRequest()

    expect(
      await execute(
        {
          url: "/sign-in",
          method: "GET",
        },
        "signIn",
      ),
    ).toBe(true)

    const state = useRequestState("signIn")

    expect(state.value.loading).toBe(false)
    expect(state.value.isError).toBe(false)
    expect(state.value.errors).toEqual([])
    expect(state.value.count).toBe(1)
    expect(state.value.counter).toBe(2)
    expect(result.value).toEqual({ id: 1 })
  })

  it("call api - two request", async () => {
    defineApiClient("default", { client })
    defineRequestIdConfig({ twoRequests: 2 })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementation(async () => ({ data: { id: 1 } }))

    const { execute } = useRequest()

    expect(
      await execute(
        {
          url: "/sign-in",
          method: "GET",
        },
        "twoRequests",
      ),
    ).toBe(true)

    expect(
      await execute(
        {
          url: "/sign-in",
          method: "GET",
        },
        "twoRequests",
      ),
    ).toBe(true)

    const state = useRequestState("twoRequests")

    expect(state.value.loading).toBe(false)
    expect(state.value.isError).toBe(false)
    expect(state.value.errors).toEqual([])
    expect(state.value.count).toBe(2)
    expect(state.value.counter).toBe(4)
  })

  it("call api - loading", async () => {
    const client = axios.create()

    defineApiClient("default", { client })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementation(async () => ({ data: { id: 1 } }))

    const { execute } = useRequest()

    execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "signIn",
    )
    const state = useRequestState("signIn")

    expect(state.value.loading).toBe(true)
    expect(state.value.isError).toBe(false)
    expect(state.value.errors).toEqual([])
    expect(state.value.count).toBe(1)
    expect(state.value.counter).toBe(1)
  })

  it("call api - error", async () => {
    const client = axios.create()

    defineApiClient("default", {
      client,
      onError: (e) => {
        expect(e.message).toEqual("api error")
      },
    })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementation(async () => {
      throw new AxiosError("api error")
    })

    const { execute } = useRequest()

    await execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "signIn",
    )
    const state = useRequestState("signIn")

    expect(state.value.loading).toBe(false)
    expect(state.value.isError).toBe(true)
    expect(state.value.errors).toEqual(["api error"])
    expect(state.value.count).toBe(1)
    expect(state.value.counter).toBe(2)
  })

  it("call api - two errors", async () => {
    const client = axios.create()

    defineApiClient("default", {
      client,
      onError: (e) => {
        expect(e.message).toEqual("api error")
      },
    })
    defineRequestIdConfig({ twoErrors: 2 })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementation(async () => {
      throw new AxiosError("api error")
    })

    const { execute } = useRequest()

    await execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "twoErrors",
    )
    await execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "twoErrors",
    )
    const state = useRequestState("twoErrors")

    expect(state.value.loading).toBe(false)
    expect(state.value.isError).toBe(true)
    expect(state.value.errors).toEqual(["api error", "api error"])
    expect(state.value.count).toBe(2)
    expect(state.value.counter).toBe(4)
  })

  it("call api - two requests but one error", async () => {
    const client = axios.create()

    defineApiClient("default", {
      client,
      onError: (e) => {
        expect(e.message).toEqual("api error")
      },
    })
    defineRequestIdConfig({ twoErrors: 2 })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementationOnce(async () => {
      throw new AxiosError("api error")
    })
    spy.mockImplementationOnce(async () => {
      return { data: { id: "" } }
    })

    const { execute } = useRequest()

    await execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "twoErrors",
    )
    await execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "twoErrors",
    )
    const state = useRequestState("twoErrors")

    expect(state.value.loading).toBe(false)
    expect(state.value.isError).toBe(true)
    expect(state.value.errors).toEqual(["api error"])
    expect(state.value.count).toBe(2)
    expect(state.value.counter).toBe(4)
  })

  it("call api - one error - second not run", async () => {
    const client = axios.create()

    defineApiClient("default", {
      client,
      onError: (e) => {
        expect(e.message).toEqual("api error")
      },
    })
    defineRequestIdConfig({ twoErrors: 2 })

    const spy = vi.spyOn(client, "request")
    spy.mockImplementationOnce(async () => {
      throw new AxiosError("api error")
    })
    spy.mockImplementationOnce(async () => {
      return { data: { id: "" } }
    })

    const { execute } = useRequest()

    await execute(
      {
        url: "/sign-in",
        method: "GET",
      },
      "twoErrors",
      { forceReset: true },
    )
    const state = useRequestState("twoErrors")

    expect(state.value.loading).toBe(false)
    expect(state.value.isError).toBe(true)
    expect(state.value.errors).toEqual(["api error"])
    expect(state.value.count).toBe(2)
    expect(state.value.counter).toBe(2)
  })
})
