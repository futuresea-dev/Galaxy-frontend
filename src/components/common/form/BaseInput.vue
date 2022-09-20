<script lang="ts">
import { defineComponent, PropType } from "vue"

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    density: {
      type: String as PropType<"compact">,
      default: "compact",
    },
    suffix: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>
