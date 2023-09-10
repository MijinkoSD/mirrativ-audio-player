<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  length: number
  current: number
}>()
const emits = defineEmits<{
  /** バーが随時操作されている際に発生するイベント */
  changing: [current: number, length: number]
  /** バーの操作が完了した際に発生するイベント */
  changed: [current: number, length: number]
  /** currentの値が変更された際に発生するイベント */
  'update:current': [newValue: number]
}>()

/** シークバーの進捗割合 */
let progress = props.current / props.length
/** .barの参照 */
const barDom = ref<HTMLDivElement>()
/** バーがクリックされていればtrue */
let isClicking: boolean = false

/** バーが操作された際のイベント */
const onMouseAction = (e: MouseEvent) => {
  // if(e.target !== e.currentTarget) return
  if (barDom.value === undefined) return
  const width = barDom.value.clientWidth
  // const posX = e.offsetX
  const rect = barDom.value.getBoundingClientRect()
  const posX = e.clientX - rect.left
  progress = posX / width

  if (progress < 0) progress = 0
  else if (progress > 1) progress = 1
}

const onMouseDown = () => {
  isClicking = true
}
const onMouseUp = () => {
  isClicking = false
}
const onMouseMove = (e: MouseEvent) => {
  if (!isClicking) return
  onMouseAction(e)
  const newCurrent = props.length * progress
  if (isClicking) {
    // クリック中の際は変更中のイベントを発生
    emits('changing', newCurrent, props.length)
  } else {
    // クリック済みの際は変更済みのイベントを発生
    emits('changed', newCurrent, props.length)
  }
  emits('update:current', newCurrent)
}

// マウスクリックを終了した際のイベントはドキュメント全体で取得できるようにする
document.addEventListener('mouseup', onMouseUp)
document.addEventListener('mouseleave', onMouseUp)
// document.addEventListener("pointerdown", onMouseDown)
document.addEventListener('mousemove', onMouseMove)
</script>

<template>
  <div class="seek-bar" @mousedown="onMouseDown">
    <div class="bar" ref="barDom">
      <div class="progress" :style="{ width: progress * 100 + '%' }" />
    </div>
    <div class="point-pos" :style="{ left: progress * 100 + '%' }">
      <div class="point"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$height: 5px;

.seek-bar {
  padding-top: 10px;
  display: block;
  width: 100%;
  height: calc(10px + $height);
}

.bar {
  width: 100%;
  height: $height;
  border-radius: calc($height / 2);
  background-color: #ddd;
  overflow: hidden;

  .progress {
    position: relative;
    left: 0;
    background-color: hsl(140 71% 60% / 1);
    width: 50%;
    height: 100%;
  }
}

.point-pos {
  position: relative;
  top: (15px - $height) * -1;
  width: 0;
}

.point {
  position: relative;
  left: calc(15px / -2);
  margin-left: -50%;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: gray;
  // ↓これが無いとイベントがバグる
  pointer-events: none;
}
</style>
