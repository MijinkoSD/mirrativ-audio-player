<script setup lang="ts">
import SeekBar from '@/templates/SeekBar.vue'
import { computed, ref } from 'vue'

const _current = ref<number>(24)
const current = computed({
  get: () => {
    return _current.value
  },
  set: (value) => {
    _current.value = Math.round(value)
  }
})
</script>

<template>
  <p>Home View.</p>
  <SeekBar class="seek-bar" v-for="i in 1" :key="i" :length="180" v-model:current="current" />
</template>

<style scoped lang="scss">
.seek-bar {
  max-width: 200px;
}
</style>
