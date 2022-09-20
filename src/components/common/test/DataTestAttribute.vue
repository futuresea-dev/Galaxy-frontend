<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    dataTest: {
      type: String,
      required: false,
      default: undefined,
    },
  },
})
</script>
