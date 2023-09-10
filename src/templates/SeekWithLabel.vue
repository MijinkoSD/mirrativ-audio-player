<script setup lang="ts">
import { computed, ref } from 'vue'
import SeekBar from './SeekBar.vue'
import { stringFormat } from '@/utilities/stringFormat'

const props = defineProps<{
  current: number
  length: number
  label?: string
  lebelWidth?: string
}>()
const emits = defineEmits<{
  'update:current': [newValue: number]
}>()

const current = computed({
  get: () => props.current,
  set: (value) => emits('update:current', value)
})
const label = ref<string>(props.label ?? '{current} / {length}')
</script>

<template>
  <div class="seek-with-label">
    <div class="label-area" :style="{ width: props.lebelWidth }">
      <span class="label"> {{ stringFormat(label, { current, length }) }} </span>
    </div>
    <SeekBar v-model:current="current" :length="length" />
  </div>
</template>

<style scoped lang="scss">
.seek-with-label {
  display: flex;
  flex-direction: row;
}
.label-area {
  width: 130px;
  font-size: 14px;
}
</style>
