<template>
  <div>
    <h1>Wirzard Test Page</h1>
    <div>
      <wizard :validation-schema="validationSchema" :items="items" @submit="onSubmit">
        <template #step-0>
          <first-name />
        </template>
        <template #step-1>
          <last-name />
        </template>
        <template #step-2>
          <street />
        </template>
        <template #step-3>
          <street />
        </template>
        <template #step-4>
          <street />
        </template>
        <template #overview> asdasdasd </template>
      </wizard>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Wizard from "../components/common/wizard/Wizard.vue"
import * as yup from "yup"
import Street from "../components/common/form/Street.vue"
import LastName from "../components/common/form/LastName.vue"
import FirstName from "../components/common/form/FirstName.vue"

export default defineComponent({
  components: { Wizard, Street, LastName, FirstName },
  setup() {
    const validationSchema = [
      yup.object({
        firstName: yup.string().required().label("Full Name"),
      }),
      yup.object({
        lastName: yup.string().required().label("Full Name"),
      }),
      yup.object({
        street: yup.string().required().label("Full Name"),
      }),
      yup.object({
        street: yup.string().required().label("Full Name"),
      }),
      yup.object({
        street: yup.string().required().label("Full Name"),
      }),
    ]

    const items = [{ title: "abc" }, { title: "edf" }, { title: "fgh" }, { title: "xxxx" }, { title: "bbb" }]

    const onSubmit = (values: { firstName: string }) => {
      console.log("submit", values)
    }

    return {
      validationSchema,
      items,
      onSubmit,
    }
  },
})
</script>
