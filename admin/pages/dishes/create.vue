<template>
  <v-container>
    <v-row justify="space-between">
      <AdminMainText>
        ジャンル追加
      </AdminMainText>

      <v-btn to="/dishes" color="success">
        ジャンル一覧へ戻る
      </v-btn>
    </v-row>

    <v-row>
      <v-col cols="12">
        <DishForm @submit="createDish" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { createDish as createDBDish } from '@/src/infra/firestore/Dish'
import { Dish } from '@/lib'

export default defineComponent({
  middleware: 'admin-auth',

  setup (_: unknown, context: SetupContext) {
    const createDish = async (dish: Dish) => {
      await createDBDish(context.root.$fireStore, context.root.$fireStoreObj, dish)

      return await context.root.$router.push('/dishes')
    }

    return {
      createDish
    }
  }
})
</script>
