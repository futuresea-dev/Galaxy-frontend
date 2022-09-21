import { ref } from "vue"
import { useI18n } from "vue-i18n"

export type YesOrNo = "yes" | "no"

export type YesOrNoList = Array<{ title: string; value: YesOrNo }>

export const useYesOrNoList = () => {
  const { t } = useI18n({ useScope: 'global' })

  return ref<YesOrNoList>([
    {
      title: t("yesOrNo.yes"),
      value: "yes",
    },
    {
      title: t("yesOrNo.no"),
      value: "no",
    },
  ])
}
