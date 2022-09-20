import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import ZipInput from "../../../../../src/components/common/form/imask/ZipInput.vue"
import { vuetify, i18n } from "../../../../config"

const selector = 'input[name="zipInput-formatted"]'

describe("ZipInput test", () => {
  it.each([
    ["70800", "708 00"],
    ["708 00", "708 00"],
    [70800, "708 00"],
    //[null, ""],
    //[true, ""],
    //[undefined, ""],
  ])("ZipInput value type test (%s) -> %s", (value, expected) => {
    const wrapper = mount(ZipInput, {
      props: {
        modelValue: value,
      },
      global: {
        plugins: [vuetify, i18n],
      },
    })

    const input = wrapper.find<HTMLInputElement>(selector)

    expect(expected).toBe(input.element.value)
  })
})
