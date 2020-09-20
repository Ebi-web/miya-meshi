<template>
  <div class="area-container mb-8">
    <h3 class="area-title">
      エリアから探す
    </h3>

    <div @click="onSearchNowLocation">
      <div class="search-now-location d-flex justify-space-between pa-4">
        <p class="mb-0">
          現在地から探す
        </p>

        <v-icon>
          mdi-chevron-right
        </v-icon>
      </div>
    </div>

    <div class="area-list-container px-4 py-2">
      <div class="d-flex justify-space-between">
        <p class="area-list-title mb-0">
          現在のエリア
        </p>

        <v-btn depressed x-small color="#d6cba6" @click="onUpdateNowArea">
          現在地を更新
        </v-btn>
      </div>

      <p class="now-area-name mb-0">
        {{ nowArea ? nowArea.name : '不明' }}
      </p>
    </div>

    <div class="px-4 py-2">
      <p class="area-list-title mb-0">
        エリア一覧
      </p>

      <v-chip-group :value="value" column multiple @change="onChange">
        <template v-for="area in areas">
          <v-chip :key="area.id" :value="area.id" small filter outlined>
            {{ area.name }}
          </v-chip>
        </template>
      </v-chip-group>

      <p class="text-right mb-0">
        <nuxt-link to="/keywords/detail" class="to-keyword-detail">
          詳細検索
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@nuxtjs/composition-api'
import { Area } from '@/lib'

type Props = {
  areas: Area[],
  nowArea: Area,
  value: string[]
}

export default defineComponent({
  props: {
    areas: {
      type: Array,
      default: () => []
    },

    nowArea: {
      type: Object,
      default: undefined
    },

    value: {
      type: Array,
      default: () => []
    }
  },

  setup (props: Props, context: SetupContext) {
    const onChange = (value: string[]) => {
      return context.emit('change', value)
    }

    const onUpdateNowArea = () => context.emit('updateNowArea')

    const onSearchNowLocation = () => {
      const _value = props.value.slice()
      if (!_value.find((v: string) => v === props.nowArea.id)) {
        _value.push(props.nowArea.id)
      }

      return onChange(_value)
    }

    return {
      onChange,
      onSearchNowLocation,
      onUpdateNowArea
    }
  }
})
</script>

<style lang="scss" scoped>
.area-container {
  border: 1rem #f6f6f6 solid;
}

.area-title {
  font-size: 1.1rem;
  font-weight: bolder;
  padding: 1rem;
}

.search-now-location {
  color: #5a5041;
  background: #faf8f5;
  font-weight: bolder;
}

.to-keyword-detail {
  font-size: 0.8rem;
}

.area-list-container {
  border-bottom: 1px solid #d5ceb7;
}

.area-list-title {
  font-size: 0.8rem;
}

.now-area-name {
  font-size: 1rem;
  font-weight: bolder;
}
</style>