import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Wizard from "../../../../src/components/common/wizard/Wizard.vue"
import * as yup from "yup"
import { vuetify } from "../../../config"

describe("Wizard test", () => {
  it("wizard progress", () => {
    const validationSchema = [
      yup.object({
        firstName: yup.string().required().label("Full Name"),
      }),
    ]

    const items = [{ title: "Test" }]

    const wrapper = mount(Wizard, {
      props: {
        validationSchema,
        items,
      },
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.find("#xxx").text()).toContain("Test")
  })
})
