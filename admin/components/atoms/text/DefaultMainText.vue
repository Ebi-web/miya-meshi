<template>
  <component
    :is="`h${level}`"
    class="default-main-text text-center"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

type Props = {
  level: 1|2|3|4|5|6
}

export default defineComponent({
  props: {
    level: {
      type: Number,
      default: 1,
      validator (v?: number) {
        return v ? [1, 2, 3, 4, 5, 6].includes(v) : false
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.default-main-text {
  font-size: 1.1rem;
  font-weight: bolder;
  padding: 1.25rem;
}
</style>
