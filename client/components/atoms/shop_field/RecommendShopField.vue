<template>
  <div class="u-light-grey-background recommend-container">
    <v-container class="py-4 px-6 px-md-3">
      <v-row>
        <template v-for="(menu, key) in menus">
          <v-col :key="menu.id" cols="12" md="4" class="px-4 px-md-1 py-0 py-md-3" :class="{ 'mb-4': menus.length - 1 !== key }">
            <template v-if="screenMd">
              <MenuCard v-bind="menu" :menu="menu" :src="menu.image" />
            </template>

            <template v-else>
              <ShopRecommendListItem :menu="menu" />
            </template>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { Menu } from '@/lib'
import { useGetScreenSize } from '@/src/CompositonFunctions/utils/UseGetScreenSize'

type State = {
  menus: Menu[]
}

type Props = {
  menus: Menu[]
}

export default defineComponent({
  props: {
    menus: Array,
    default: () => []
  },

  setup () {
    const { screenMd } = useGetScreenSize()

    return {
      screenMd
    }
  }
})
</script>

<style lang="scss" scoped>
.recommend-container {
  @include mq(md) {
    background: $white;
  }
}
</style>
