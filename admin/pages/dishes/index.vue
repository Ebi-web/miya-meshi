<template>
  <v-container>
    <v-row justify="space-between">
      <AdminMainText>
        ジャンル一覧
      </AdminMainText>

      <v-btn to="/dishes/create" color="success">
        ジャンル追加
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12">
        <DishDataTable :dishes="state.dishes" @delete="onDelete" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, SetupContext } from '@vue/composition-api'
import { Dish } from '@/lib'
import { deleteDish, getDishList } from '@/src/infra/firestore/Dish'

type State = {
  dishes: Dish[]
}
export default defineComponent({
  middleware: 'admin-auth',

  setup (_, context: SetupContext) {
    const state = reactive<State>({
      dishes: [] as Dish[]
    })

    onMounted(async () => {
      state.dishes = await getDishList(context.root.$fireStore)
    })

    const onDelete = async (id: string) => {
      await deleteDish(context.root.$fireStore, id)

      state.dishes = state.dishes.filter(dish => dish.id !== id)
    }

    return {
      onDelete,
      state
    }
  }
})
</script>
