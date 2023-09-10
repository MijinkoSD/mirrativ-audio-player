<script setup lang="ts">
import { computed, ref } from 'vue'
import SeekWithLabel from '@/templates/SeekWithLabel.vue'
// import { getPlayer } from '@/connect/audio'

const _current = ref<number>(24)
const current = computed({
  get: () => {
    return _current.value
  },
  set: (value) => {
    _current.value = Math.round(value)
  }
})

const liveId = ref<string>('')

// const playLive = () => {

// }
</script>

<template>
  <p>Home View.</p>
  <input :value="liveId" placeholder="ライブID" />
  <SeekWithLabel class="seek-bar" :length="180" v-model:current="current" />
</template>

<style scoped lang="scss">
.seek-bar {
  max-width: 200px;
}
</style>
