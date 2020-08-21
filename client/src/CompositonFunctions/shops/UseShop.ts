import { computed, SetupContext, watchEffect } from '@vue/composition-api'
import { Shop } from '~/src/types/Shop'
import { ActionType } from '~/store/shops'

export const useShop = ({ $store }: SetupContext['root']) => {
  const shops = computed(() => {
    return $store.getters['shops/shops'] as Shop[]
  })

  watchEffect(async () => {
    await $store.dispatch(`shops/${ActionType.FETCH_SHOPS}`)
  })

  return {
    shops
  }
}
