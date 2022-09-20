import { test, expect } from "vitest"
import MaskInput from "../../../../src/components/common/form/MaskInput.vue"

test("mask input", async () => {
  expect(MaskInput).toBeTruthy()
  // const wrapper = mount(MaskInput, {
  //   props: {
  //     name: "xxx",
  //     label: "date",
  //     maskType: "date",
  //   },
  // })
  //
  // expect(wrapper.text()).toContain("Přihlásit se")
})
