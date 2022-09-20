import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import PhoneInput from "../../../../../src/components/common/form/imask/PhoneInput.vue"
import { vuetify, i18n } from "../../../../config"

const selector = 'input[name="phone-formatted"]'

describe("PhoneInput test", () => {
  it.each([
    ["731130381", "731 130 381"],
    ["731 130 381", "731 130 381"],
    [731130381, "731 130 381"],
    //[null, ""],
    //[true, ""],
    //[undefined, ""],
  ])("PhoneInput value type test (%s) -> %s", (value, expected) => {
    const wrapper = mount(PhoneInput, {
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
