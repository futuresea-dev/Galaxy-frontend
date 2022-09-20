import { ref } from "vue"
import { useI18n } from "vue-i18n"

export type Gender = "man" | "woman"

export type GenderList = Array<{ title: string; value: Gender }>

export const useGenderList = () => {
  const { t } = useI18n()

  return ref<GenderList>([
    { title: t("gender.man"), value: "man" },
    { title: t("gender.woman"), value: "woman" },
  ])
}
